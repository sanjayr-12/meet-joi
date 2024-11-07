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
      return res.status(200).json(newChat);
    }
    return res.status(400).json({ error: "something went wrong" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const { userId } = req.auth;
    const messages = await chatModel.find({ userId }).lean().select("messages"); 
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Problem in retrieving chats" });
    }
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};
