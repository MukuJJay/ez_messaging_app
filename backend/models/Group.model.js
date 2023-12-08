import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now() },
});

const Group = new mongoose.model("Group", groupSchema);

export default Group;
