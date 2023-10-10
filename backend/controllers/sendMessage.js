import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const sendMessage = async (socket, { msg, senderId, receiverId }) => {
  const ObjectId = mongoose.Types.ObjectId;

  const senderIdObj = new ObjectId(senderId);
  const receiverIdObj = new ObjectId(receiverId);

  const message = await Message.create({ msg });

  await Conversation.create({
    senderId: senderIdObj,
    receiverId: receiverIdObj,
    messageId: message._id,
  });

  let allConvo = await Conversation.find({
    $or: [
      { senderId: senderIdObj, receiverId: receiverIdObj },
      { senderId: receiverIdObj, receiverId: senderIdObj },
    ],
  });

  allConvo = await Promise.all(
    allConvo.map(async (e) => {
      const messageForSingleConvo = await Message.findById(e.messageId);
      const newObj = { ...e, msgObj: messageForSingleConvo };

      return newObj;
    })
  );

  socket.emit("allConvo", allConvo);
};

// const  receive
