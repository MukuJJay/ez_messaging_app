import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ChatRequest from "../models/ChatRequest.js";

function findcommonId(arr1, arr2) {
  for (const item of arr1) {
    for (const elem of arr2) {
      if (item.equals(elem)) return elem;
    }
  }
}

function getUserId(req) {
  const token = req.headers.authorization.slice(7).trim();
  const id = jwt.verify(token, process.env.JWT_SECRET).id;
  return id;
}

export const sendChatRequest = async (req, res) => {
  const senderId = getUserId(req);

  const { receiverId } = req.body;
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  const isChatRequest = await ChatRequest.findOne({
    sender: sender._id,
    receiver: receiver._id,
  });

  const isReverseChatRequest = await ChatRequest.findOne({
    sender: receiver._id,
    receiver: sender._id,
  });

  if (isReverseChatRequest) {
    res.status(400).json({
      message: `${receiver.username} already sent you a chat request`,
    });
    return;
  }

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
  const userId = getUserId(req);

  const userInfo = await User.findOne({ _id: userId });

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
};

export const addOrRemoveContactsRequests = async (req, res) => {
  const { decesion, userWhoSentId } = req.body;
  const userId = getUserId(req);

  const user = await User.findById(userId);
  const userWhoSent = await User.findById(userWhoSentId);

  const commonReqId = findcommonId(
    user?.chatRequests,
    userWhoSent?.chatRequests
  );

  const chatRequestObj = await ChatRequest.findById(commonReqId);

  if (
    decesion &&
    (chatRequestObj?.status === "pending" ||
      chatRequestObj?.status === "rejected")
  ) {
    await user.updateOne({ contacts: [...user.contacts, userWhoSent._id] });
    await userWhoSent.updateOne({
      contacts: [...userWhoSent.contacts, user._id],
    });
    await chatRequestObj.updateOne({ status: "accepted" });

    res.status(200).json({
      message: `${userWhoSent?.username} has been added as a contact`,
    });

    return;
  }

  if (!decesion) {
    chatRequestObj?.status === "rejected";
    await chatRequestObj.save();
    await chatRequestObj.deleteOne({ status: "rejected" });

    user.chatRequests = user.chatRequests.filter(
      (e) => !e.equals(chatRequestObj._id)
    );
    await user.save();

    userWhoSent.chatRequests = userWhoSent.chatRequests.filter(
      (e) => !e.equals(chatRequestObj._id)
    );
    await userWhoSent.save();

    res.status(200).json({
      message: `Chat request from ${userWhoSent.username} has been deleted`,
    });

    return;
  }

  res
    .status(400)
    .json({ message: "You are already friends. Stop being creepy !!!" });
};

export const removeContacts = async (req, res) => {
  const userId = getUserId(req);

  const { contactId } = req.body;

  if (!contactId) {
    res.status(400).json({ message: "No contact_id provided" });
    return;
  }

  const user = await User.findById(userId);
  const contact = await User.findById(contactId);
  const commonChatReqId = findcommonId(user.chatRequests, contact.chatRequests);

  const chatReqObj = await ChatRequest.findById(commonChatReqId);

  user.contacts = user.contacts.filter((e) => !e.equals(contact?._id));
  user.chatRequests = user.chatRequests.filter(
    (e) => !e.equals(chatReqObj._id)
  );
  contact.contacts = contact.contacts.filter((e) => !e.equals(user?._id));
  contact.chatRequests = contact.chatRequests.filter(
    (e) => !e.equals(chatReqObj._id)
  );

  await ChatRequest.deleteOne({ _id: chatReqObj._id });
  await user.save();
  await contact.save();

  res.status(200).json({
    message: `${contact?.username} deleted from contacts successfully.`,
  });
};
