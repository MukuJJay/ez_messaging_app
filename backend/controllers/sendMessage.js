import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (socket, { msg, senderId, receiverId }) => {
  const ObjectId = mongoose.Types.ObjectId;

  const senderIdObj = new ObjectId(senderId);
  const receiverIdObj = new ObjectId(receiverId);

  const message = Message.create({ msg });

  await Conversation.create({
    senderId: senderIdObj,
    receiverId: receiverIdObj,
    messageId: message._id,
  });

  const allConvo = Conversation.find({
    senderId: senderIdObj || receiverIdObj,
    receiverId: receiverIdObj || senderIdObj,
  });
  socket.emit("allConvo", allConvo);
};

// const  receive
