import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  contacts: { type: Array },
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
