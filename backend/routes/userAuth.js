import express from "express";
import { login, register } from "../controllers/userAuth.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  try {
    fn(req, res);
  } catch (err) {
    return;
  }
};

router.post("/register", (req, res) => errorHandler(req, res, register));
router.post("/login", (req, res) => errorHandler(req, res, login));

export default router;
