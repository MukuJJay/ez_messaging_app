import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashingPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsernameChecker = await UserModel.findOne({
      username: username,
    });

    if (existingUsernameChecker) {
      res.status(500).json({ message: "User Already Exists!" });
    } else {
      const hashedPassword = await hashingPassword(password); //hashing password
      const createdUser = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword,
      });

      if (createdUser) {
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);

        res.status(201).json({
          token: token,
          message: `User ${createdUser.username} created successfully`,
          status: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) res.status(400).json({ message: "User Not Found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ message: "Invalid Password!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token: token, status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
