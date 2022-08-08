import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("conversation", Schema);

export default model;
