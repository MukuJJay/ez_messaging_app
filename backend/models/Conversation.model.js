import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    isGroup: { type: Boolean, default: "false", enum: [true, false] },
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Conversation = new mongoose.model("Conversation", conversationSchema);

export default Conversation;
