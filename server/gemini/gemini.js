import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { configDotenv } from "dotenv";
import chatModel from "../model/chatSchema.js";
configDotenv();

const genAi = new GoogleGenerativeAI(process.env.AI_KEY);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySettings,
});

async function GenerateContent(prompt, userId) {
  try {
    const history = await chatModel.find({ userId }).select("messages");

    const summary = await model.generateContent(
      process.env.UTIL_TEXT2 + history
    );
    console.log(summary.response.text());

    const result = await model.generateContent(
      process.env.UTIL_TEXT + " " + summary.response.text() + " " + prompt
    );
    return result.response.text();
  } catch (error) {
    throw error;
  }
}

export default GenerateContent;
