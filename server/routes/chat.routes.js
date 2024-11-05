import express from "express"
import { ChatAi } from "../controller/chat.controller.js"

const router = express.Router()


router.get("/", ChatAi)

export default router