import userModel from "../models/User.js";

export const searchUsers = async (req, res) => {
  const { usernameOrEmail } = req.body;
  const regexp = new RegExp("^" + usernameOrEmail, "i");

  const matchedUsernames = await userModel.find({ username: regexp });
  const matchedEmails = await userModel.find({ email: regexp });

  const matchedEnitites = [...matchedUsernames, ...matchedEmails];

  const duplicatesRemovedList = matchedEmails.filter((obj, index, arr) => {
    const indexofObj = arr.findIndex((item) => item.id === obj.id);
    return indexofObj === index;
  });

  duplicatesRemovedList.map((e) => (e.password = null));

  res.status(200).json({ data: duplicatesRemovedList });
};
