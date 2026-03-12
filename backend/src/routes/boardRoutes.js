import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import {
  createBoard,
  getBoards,
  getBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController.js";

const router = Router();

router.post("/boards", protect, createBoard);

router.get("/boards", protect, getBoards);

router.get("/boards/:id", protect, getBoard);

router.put("/boards/:id", protect, updateBoard);

router.delete("/boards/:id", protect, deleteBoard);

export default router;
