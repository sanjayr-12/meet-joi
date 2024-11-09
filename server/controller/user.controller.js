import { createClerkClient } from "@clerk/backend";
import { configDotenv } from "dotenv";
configDotenv();
import userModel from "../model/userSchema.js";
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const addUser = async (req, res) => {
  try {
    const { userId } = req.auth;
    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }
    const checkUser = await userModel.findOne({ userId });
    if (!checkUser) {
      const userData = await clerkClient.users.getUser(userId);
      const newUser = new userModel({
        userId,
        name: userData.fullName,
      });
      await newUser.save();
      return res.status(200).json({ message: "logged in" });
    }
    res.status(200).json({ message: "welcome back" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
