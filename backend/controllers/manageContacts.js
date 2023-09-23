import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ChatRequest from "../models/ChatRequest.js";

export const sendChatRequest = async (req, res) => {
  const token = req.headers.authorization.slice(7).trim();
  let senderId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    senderId = decoded.id;
  } catch (err) {
    res.status(500).json({ message: "Invalid token !!!" });
  }

  const { receiverId } = req.body;
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  const isChatRequest = await ChatRequest.findOne({
    sender: sender._id,
    receiver: receiver._id,
  });

  if (isChatRequest) {
    switch (isChatRequest.status) {
      case "pending":
        res.status(500).json({ message: "Chat request already sent" });
        break;
      case "accepted":
        res
          .status(500)
          .json({ message: "You are already friends! Stop being creepy" });
    }
    return;
  }
  const chatRequestObj = await ChatRequest.create({
    sender: sender._id,
    receiver: receiver._id,
  });
  await sender.updateOne({
    chatRequests: [...sender.chatRequests, chatRequestObj._id],
  });
  await receiver.updateOne({
    chatRequests: [...receiver.chatRequests, chatRequestObj._id],
  });

  res.status(200).json({
    message: "Chat request sent successfully!",
    data: { chatRequestObj },
  });
};

export const checkChatRequests = async (req, res) => {
  const token = req.headers.authorization.slice(7).trim();

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(500).json({ message: "Invalid Token" });
    } else {
      const userInfo = await User.findOne({ _id: decoded.id });

      const chatRequestIds = userInfo?.chatRequests.map((e) => e);
      const senderUsers = [];

      for (const e of chatRequestIds) {
        const chatRequestObj = await ChatRequest.findById(e);
        if (
          chatRequestObj?.status === "pending" &&
          !chatRequestObj?.sender.equals(userInfo._id)
        ) {
          const senderUser = await User.findById({
            _id: chatRequestObj.sender,
          }).select("-password");
          senderUsers.push(senderUser);
        }
      }
      res.status(200).json({ data: senderUsers });
    }
  });
};

export const addOrRemoveContactsRequests = async (req, res) => {};
