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

router.post("/boards", createBoard);

router.get("/boards", getBoards);

router.get("/boards/:id", getBoard);

router.put("/boards/:id", updateBoard);

router.delete("/boards/:id", deleteBoard);

export default router;
