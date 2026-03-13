import { Router } from "express";
import { signUpController, logInController, logOutController,userController, forgotPasswordController,resetPasswordController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateSchema.js";
import { signupSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "../zod/authValidation.js";

const router = Router();

router.post("/signup", validate(signupSchema), signUpController);

router.post("/login",validate(loginSchema), logInController);

router.post("/logout", logOutController);
router.get("/me", authMiddleware, userController);

router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  forgotPasswordController
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPasswordController
);


export default router;
