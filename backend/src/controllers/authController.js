import jwt from "jsonwebtoken";
import { logInService, signUpService } from "../services/authService.js";
import { users } from "../models/userModel.js";
import { sendMail } from "../utils/sendMail.js";
import { bcryptFunction } from "../utils/bcryptFunction.js";

export const signUpController = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;
  try {
    const emailExist = await signUpService(name, email, phone, password);
    if (emailExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Account not created, server error" });
  }
};

export const logInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await logInService(email, password);

    //with JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Log In successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userController = async (req, res) => {
  res.json(req.currentUser);
};

export const logOutController = (_, res) => {
  res.clearCookie("token");
  res.status(201).json({ message: "Log Out successfully" });
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const html = `
      <h2>Password Reset</h2>
      <p>Click below to reset your password</p>
      <a href="${resetLink}">${resetLink}</a>
    `;

    await sendMail(user.email, "Reset Password", html);

    res.json({
      message: "Reset link sent to email. Open that link to Reset Password.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send email" });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await users.findById(decoded.id);

    if (!user || user.resetToken !== token) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.resetTokenExpire < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await bcryptFunction(password);

    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({
      message: "Password reset successfully. Login Now.",
    });
  } catch (err) {
    res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
