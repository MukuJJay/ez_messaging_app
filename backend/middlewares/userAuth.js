import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) res.status(403).json({ message: "Access Denied" });

  if (token.startsWith("Bearer ")) token = token.slice(7).trim();
};
