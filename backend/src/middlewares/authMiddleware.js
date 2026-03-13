import jwt from "jsonwebtoken";
import { users } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await users.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.currentUser = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


