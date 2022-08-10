import User from "./../models/user.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// save the new user to database
export const save = async (newUser) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);

  const payload = new User({
    username: newUser.username,
    email: newUser.email,
    password: hashedPassword,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });

  const user = new User(payload);
  return user.save();
};

// find the user is present in database or not
export const findUser = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// 6 digit otp will be sent
export const sendOtp = async (userData) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  // controls email sender flow
  // let transporter = nodemailer.createTransport({
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASSWORD,
  //   },
  // });

  // const mailOptions = {
  //   from: process.env.EMAIL,
  //   to: userData.email,
  //   subject: "One Time Password for WireFly",
  //   text: `Dear ${
  //     userData.firstName + " " + userData.lastName + ","
  //   }\n\nThank you for choosing WireFly.\n\nUse the following OTP to complete your Sign Up procedure.\n\n${otp}\n\nRegards,\nTeam WireFly.`,
  // };

  // await transporter.sendMail(mailOptions);
  console.log("OTP:", otp);
  return { otp };
};
