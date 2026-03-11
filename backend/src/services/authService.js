import { users } from "../models/userModel.js";
import { bcryptFunction } from "../utils/bcryptFunction.js";
import bcrypt from "bcrypt";

export const signUpService = async (name, email, phone, password) => {
  const emailExist = await users.findOne({ email });
  if (emailExist) {
    return emailExist;
  }

  const hashedPassword = await bcryptFunction(password);
  await users.create({ name, email, phone, password: hashedPassword });
  return;
};

export const logInService = async (email, password) => {
  const userExist = await users.findOne({ email });
  if (!userExist) {
    throw new Error("User not exist");
  }
  const isPasswordMatched = await bcrypt.compare(password, userExist.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }
  return userExist;
};
