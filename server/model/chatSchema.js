import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: [
      {
        ai: {
          type: String,
        },
        user: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
