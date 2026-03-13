import { Board } from "../models/boardModel.js";

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.boardTitle,
      columns: req.body.columns,
      userId: req.currentUser._id,
    });

    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      userId: req.currentUser._id,
    });

    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBoard = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      userId: req.currentUser._id,
    });
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
     const updateData = {
       title: req.body.boardTitle,
       columns: req.body.columns,
       userId: req.currentUser._id,
     };
     const updatedBoard = await Board.findOneAndUpdate(
       {
         _id: req.params.id,
         userId: req.currentUser._id,
       },
       updateData,
       { returnDocument: "after" }
     );
    res.json(updatedBoard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBoard = async (req, res) => {
  try {
    await Board.findOneAndDelete({
      _id: req.params.id,
      userId: req.currentUser._id,
    });
    res.json({ message: "Board Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
