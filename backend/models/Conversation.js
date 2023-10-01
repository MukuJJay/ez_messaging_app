import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  createdAt: { type: Date, default: Date.now() },
});

const Conversation = new mongoose.model("Conversation", conversationSchema);

export default Conversation;
