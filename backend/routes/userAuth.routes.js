import express from "express";
import { login, register } from "../controllers/userAuth.controller.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  try {
    fn(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

router.post("/register", (req, res) => errorHandler(req, res, register));
router.post("/login", (req, res) => errorHandler(req, res, login));

export default router;
