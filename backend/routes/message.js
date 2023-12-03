import express from "express";
import { receiveMessage } from "../controllers/send-receiveMessage.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  try {
    fn(req, res);
  } catch {
    return {
      status: 201,
      data: [],
      message: "Issue loading messages!",
    };
  }
};

// router.post("/receiveMessage", (req, res) =>
//   errorHandler(req, res, receiveMessage)
// );

export default router;
