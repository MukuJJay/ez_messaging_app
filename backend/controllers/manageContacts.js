import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const sendChatRequest = async (req, res) => {};

export const checkChatRequests = async (req, res) => {
  const token = req.query.token;
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "Invalid Token" });
    } else {
      const userInfo = await User.findOne({ _id: decoded.id });
      res.status(200).json({ data: userInfo.chatRequests });
    }
  });
};

export const addOrRemoveContactsRequests = async (req, res) => {};
