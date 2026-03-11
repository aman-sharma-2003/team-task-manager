import { Board } from "../models/boardModel.js";

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.boardTitle,
      columns: req.body.columns,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBoards = async (_, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const data = req.body;
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
    });
    res.json(updatedBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
