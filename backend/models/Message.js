import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  message: { type: String },
  seen: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now() },
});

const Conversation = new mongoose.model("Conversation", conversationSchema);

export default Conversation;
