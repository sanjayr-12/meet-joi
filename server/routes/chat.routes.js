import express from "express"
import { ChatAi, getAll } from "../controller/chat.controller.js"

const router = express.Router()


router.post("/post", ChatAi)
router.get("/", getAll)

export default router