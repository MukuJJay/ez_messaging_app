import express from "express";
import { searchUsers } from "../controllers/searchUsers.controller.js";
import {
  sendChatRequest,
  addOrRemoveContactsRequests,
  checkChatRequests,
  removeContacts,
} from "../controllers/manageContacts.controller.js";
import { getUserInfo } from "../controllers/userInfo.controller.js";

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
router.get("/userInfo", (req, res) => errorHandler(req, res, getUserInfo));
router.put("/deleteContacts", (req, res) =>
  errorHandler(req, res, removeContacts)
);

export default router;
