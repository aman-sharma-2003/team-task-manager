import { Label } from "../models/labelModel.js";

export const createLabel = async (req, res) => {
  try {
    const labelsName = req.body.label;
    const labelExist = await Label.findOne({ labels: labelsName });
    if (labelExist) {
      res.status(400).json({ success: false, message: "Label already exists" });
    }
    if (!labelExist) {
      const label = await Label.create({
        labels: req.body.label,
      });
      return res.status(201).json({
        success: true,
        message: "Label created successfully",
        data: label,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLabels = async (_, res) => {
  try {
    const labels = await Label.find({});
    if (!labels) {
      return res
        .status(500)
        .json({ success: false, message: "No Labels Found" });
    }

    return res.status(201).json({
      success: true,
      message: "Labels found successfully",
      data: labels,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const updatedLabel = await Label.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        labels: req.body.label,
      },
      { returnDocument: "after" }
    );

    return res.status(201).json({
      success: true,
      message: "Label updated successfully",
      data: updatedLabel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    const deletedLabel = await Label.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Label deleted successfully",
      data: deletedLabel,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
