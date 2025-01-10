import express from "express";
import { isAdminAuthenticated } from "../middlewares/auth.js";

import { sendMessage,getAllMessages } from "../controller/messageController.js";

const router = express.Router();
router.post("/sendMessage", sendMessage);
router.get("/getAllMessages", isAdminAuthenticated, getAllMessages);
export default router;

