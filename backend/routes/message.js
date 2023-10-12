import express from "express";
import { receiveMessage } from "../controllers/send-receiveMessage.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  fn(req, res);
};

router.get("/receiveMessage", (req, res) =>
  errorHandler(req, res, receiveMessage)
);

export default router;
