import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
      min: 6,
    },
    firstName: {
      type: String,
      required: "First Name is required",
      max: 50,
    },
    lastName: {
      type: String,
      required: "Last Name is required",
      max: 50,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
      max: 50,
    },
    interestedPosts: {
      type: Array,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("user", Schema);

export default model;
