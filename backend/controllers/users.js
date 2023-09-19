import userModel from "../models/User.js";

export const searchUsers = async (req, res) => {
  const { username } = req.body;
  const regexp = new RegExp("^" + username, "i");

  const allUsers = await userModel.find({ username: regexp });
  allUsers.map((e) => (e.password = ""));

  res.status(200).send(allUsers);
};
