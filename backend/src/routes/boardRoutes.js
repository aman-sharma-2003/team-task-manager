import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";

const router = Router();

router.post("/boards", authMiddleware, createBoard);

router.get("/boards", authMiddleware, getBoards);

router.get("/boards/:id", authMiddleware, getBoard);

router.put("/boards/:id", authMiddleware, updateBoard);

router.delete("/boards/:id", authMiddleware, deleteBoard);

export default router;
