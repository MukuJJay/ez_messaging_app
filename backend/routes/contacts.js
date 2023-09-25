import express from "express";
import { searchUsers } from "../controllers/searchUsers.js";
import {
  sendChatRequest,
  addOrRemoveContactsRequests,
  checkChatRequests,
} from "../controllers/manageContacts.js";
const router = express.Router();

const errorHandler = (req, res, fn) => {
  try {
    fn(req, res);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return err;
  }
};

router.get("/searchUsers", (req, res) => errorHandler(req, res, searchUsers));
router.post("/sendChatRequest", (req, res) =>
  errorHandler(req, res, sendChatRequest)
);
router.get("/checkChatRequests", (req, res) =>
  errorHandler(req, res, checkChatRequests)
);
router.post("/addOrRemoveContactsRequests", (req, res) =>
  errorHandler(req, res, addOrRemoveContactsRequests)
);

export default router;
