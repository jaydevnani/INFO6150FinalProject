import User from "./../models/user.js";
import bcrypt from "bcrypt";

// get user details by id
export const getById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

// get user details by username
export const getByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

// updating user details
export const updateById = async (user, newUser) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);

  const payload = {
    username: newUser.username,
    email: newUser.email,
    password: hashedPassword,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };

  return await user.updateOne({ $set: payload });
};
