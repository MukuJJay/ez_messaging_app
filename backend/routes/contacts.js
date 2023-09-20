import express from "express";
import { searchUsers } from "../controllers/searchUsers.js";
import {
  sendChatRequest,
  addOrRemoveContactsRequests,
  checkChatRequests,
} from "../controllers/manageContacts.js";
const router = express.Router();

router.get("/searchUsers", searchUsers);
router.post("/sendChatRequest", sendChatRequest);
router.get("/checkChatRequests", checkChatRequests);
router.post("/addOrRemoveContactsRequests", addOrRemoveContactsRequests);

export default router;
