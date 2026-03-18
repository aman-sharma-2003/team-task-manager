import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createLabel, getLabels, updateLabel, deleteLabel } from "../controllers/labelController.js";


const router = Router();

router.post("/label", authMiddleware, createLabel);

router.get("/labels", authMiddleware, getLabels);

router.put("/label", authMiddleware, updateLabel);

router.delete("/label/:id", authMiddleware, deleteLabel);

export default router;
