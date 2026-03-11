import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  resetToken: String,
  resetTokenExpire: Date,
});

export const users = mongoose.model("Users", userSchema);
