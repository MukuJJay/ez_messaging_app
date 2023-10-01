import jwt from "jsonwebtoken";

export const sendMessage = async (req, res) => {
  const token = req.header.authorization.slice(7).trim();
  const senderId = jwt.verify(token, process.env.JWT_SECRET).id;
  const receiverId = req.body.receiverId;
  res.json({ receiverId: receiverId });
};
