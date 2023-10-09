import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  msg: { type: String },
  seen: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now() },
});

const Conversation = new mongoose.model("Message", msgSchema);

export default Conversation;
