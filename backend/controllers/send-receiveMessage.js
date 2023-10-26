import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import jwt from "jsonwebtoken";

export const sendMessage = async (
  io,
  socket,
  { msg, senderId, receiverId }
) => {
  const ObjectId = mongoose.Types.ObjectId;

  const senderIdObj = new ObjectId(senderId);
  const receiverIdObj = new ObjectId(receiverId);

  const message = await Message.create({ msg });

  await Conversation.create({
    senderId: senderIdObj,
    receiverId: receiverIdObj,
    messageId: message._id,
  });

  const allConvo = await Conversation.find({
    $or: [
      { senderId: senderIdObj, receiverId: receiverIdObj },
      { senderId: receiverIdObj, receiverId: senderIdObj },
    ],
  }).populate("messageId");

  io.emit("allConvo", allConvo);
};

export const receiveMessage = async (req, res) => {
  const token = req.headers.authorization.slice(7).trim();
  const userId = jwt.verify(token, process.env.JWT_SECRET).id;
  const receiverId = req.body.receiverId;
  const allConvo = await Conversation.find({
    $or: [
      { senderId: userId, receiverId: receiverId },
      { senderId: receiverId, receiverId: userId },
    ],
  }).populate("messageId");

  res.status(200).json({
    status: 200,
    data: allConvo,
  });
};
