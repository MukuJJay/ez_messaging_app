import mongoose from "mongoose";

const ChatRequestsSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const ChatRequests = new mongoose.model("ChatRequests", ChatRequestsSchema);

export default ChatRequests;
