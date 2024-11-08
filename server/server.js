import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { configDotenv } from "dotenv";
import { protectedRoutes } from "./util/protected.js";
import chatRouter from "./routes/chat.routes.js";
import userRouter from "./routes/user.routes.js";
import { connectDB } from "./db/db.js";
configDotenv();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/chat", protectedRoutes, chatRouter);
app.use("/api/user", userRouter);

app.listen(3000, () => {
  connectDB();
  console.log("server started");
});
