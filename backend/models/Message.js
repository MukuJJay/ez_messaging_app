import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
  {
    msg: { type: String },
    seen: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "createdAt" } }
);

const Conversation = new mongoose.model("Message", msgSchema);

export default Conversation;
