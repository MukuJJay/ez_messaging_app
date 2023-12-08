import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const searchUsers = async (req, res) => {
  const token = req.headers.authorization.slice(7).trim();
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const usernameOrEmail = req.query.usernameOrEmail;
  const regexp = new RegExp("^" + usernameOrEmail, "i");

  const matchedUsernames = await User.find({ username: regexp }).select(
    "-password"
  );
  const matchedEmails = await User.find({ email: regexp }).select("-password");

  const matchedEnitites = [...matchedUsernames, ...matchedEmails];

  //filtering duplicates & same user
  const duplicatesRemovedList = matchedEnitites.filter((obj, index, arr) => {
    if (obj.id === userId) return;
    const indexofObj = arr.findIndex((item) => item.id === obj.id);
    return indexofObj === index;
  });

  res.status(200).json({ data: duplicatesRemovedList });
};
