import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getUserInfo = async (req, res) => {
  const token = req.headers.authorization.slice(7).trim();
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;

  if (!userId) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  const user = await User.findById(userId).select("-password");

  const contacts = [];

  if (user) {
    for (const item of user.contacts) {
      const contact = await User.findById(item).select("-password");
      contacts.push(contact);
    }
  }

  res.status(200).json({ data: user, contacts: contacts });
};
