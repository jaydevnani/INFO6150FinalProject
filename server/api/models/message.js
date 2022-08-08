import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("message", Schema);

export default model;
