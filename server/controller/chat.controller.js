import GenerateContent from "../gemini/gemini.js";
import chatModel from "../model/chatSchema.js";
import userModel from "../model/userSchema.js";

export const ChatAi = async (req, res) => {
  const { prompt } = req.body;
  const { userId } = req.auth;
  try {
    const response = await GenerateContent(prompt, userId);
      const checkUser = await userModel.findOne({ userId });
      console.log(prompt);
      
    if (checkUser) {
      const chatData = {
        user: prompt,
        ai: response,
      };
      const newChat = new chatModel({
        userId,
        messages: chatData,
      });
      await newChat.save();
      return res.status(200).json({ message: "saved", response });
    }
    return res.status(400).json({ error: "something went wrong" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
