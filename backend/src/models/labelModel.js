import mongoose from "mongoose";

const labelSchema = mongoose.Schema({
  labels: String,
});

export const Label = mongoose.model("Labels", labelSchema);
