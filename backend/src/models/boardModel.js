import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  cards: [taskSchema],
});

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    background: String,

    columns: [columnSchema],
    
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Board = mongoose.model("Board", boardSchema);
