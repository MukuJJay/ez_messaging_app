import mongoose from "mongoose";
import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";
import jwt from "jsonwebtoken";

function handleToken(req) {
  const token = req.headers.authorization.slice(7).trim();
  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  return id;
}

function generateCommonId(ids) {
  const sortedIds = ids.sort().join("-");
  return sortedIds;
}

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

  const allIds = [senderId, receiverId];
  const room = generateCommonId(allIds);

  socket.join(room);

  const allConvo = await Conversation.aggregate([
    {
      $match: {
        $or: [
          {
            senderId: senderIdObj,
            receiverId: receiverIdObj,
          },
          {
            senderId: receiverIdObj,
            receiverId: senderIdObj,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "messages",
        let: { messageId: "$messageId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$messageId"] }],
              },
            },
          },
        ],
        as: "message_details",
      },
    },
    {
      $unwind: {
        path: "$message_details",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  io.to(room).emit("allConvo", allConvo);
};

export const receiveMessage = async (io, socket, { senderId, receiverId }) => {
  const ObjectId = mongoose.Types.ObjectId;

  const senderIdObj = new ObjectId(senderId);
  const receiverIdObj = new ObjectId(receiverId);

  const allConvo = await Conversation.aggregate([
    {
      $match: {
        $or: [
          {
            senderId: senderIdObj,
            receiverId: receiverIdObj,
          },
          {
            senderId: receiverIdObj,
            receiverId: senderIdObj,
          },
        ],
      },
    },
    {
      $lookup: {
        from: "messages",
        let: { messageId: "$messageId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ["$_id", "$$messageId"] }],
              },
            },
          },
        ],
        as: "message_details",
      },
    },
    {
      $unwind: {
        path: "$message_details",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);

  const allIds = [senderId, receiverId];
  const room = generateCommonId(allIds);

  socket.join(room);

  io.to(socket.id).emit("allConvo", allConvo);
};
