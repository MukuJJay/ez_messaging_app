import express from "express";
import { sendMessage } from "../controllers/sendMessage.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  fn(req, res);
};

router.post("/sendMessage", (req, res) => errorHandler(req, res, sendMessage));

export default router;
