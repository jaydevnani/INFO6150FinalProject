import mongoose from "mongoose";

//Schema Changes

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: "Title Input is required",
      max: 50,
    },
    desc: {
      type: String,
      max: 500,
    },
    price: {
      type: Number,
      required: "Price Input is required",
    },
    planType: {
      type: String,
      required: "Plan type Input is required",
      max: 50,
    },
    totalMembersRequired: {
      type: Number,
      required: "Total number of members Input is required",
    },
    membersRequired: {
      type: Number,
      required: "Number of members Input is required",
    },
    status: {
      type: String,
      max: 50,
    },
    interestedUsers: {
      type: Array,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("post", Schema);

export default model;
