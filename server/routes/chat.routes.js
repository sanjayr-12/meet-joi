import express from "express";
import { ChatAi, getAll, deleteChat } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/post", ChatAi);
router.get("/", getAll);
router.delete("/delete", deleteChat)

export default router;
