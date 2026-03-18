import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowInput,
  getLabels,
  createLabel,
  updateLabel,
  setIsEditLabel,
  deleteLabel,
} from "../features/labelSlice";
import { useState } from "react";

export const LabelModal = ({
  setOpenLabelModal,
  appendLabel,
  removeLabel,
  getValues,
  columnId,
  taskId,
}) => {
  const { labels, showInput, isEditLabel } = useSelector(
    (state) => state.label
  );
  const [label, setLabel] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (label.trim() === "") {
      return alert("Label cannot be empty");
    }
    if (isEditLabel) {
      const id = isEditLabel._id;
      dispatch(updateLabel({ label, id }));
      setLabel("");
    } else {
      dispatch(createLabel({ label }));
      setLabel("");
    }
  };

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  const handleLabelEdit = (labelToEdit) => {
    setLabel(labelToEdit?.labels);
    dispatch(setShowInput(true));
    dispatch(setIsEditLabel(labelToEdit));
  };

  const handleLabelDelete = (id) => {
    dispatch(deleteLabel({ id }));
  };

  const handleCheckBox = (columnId, taskId, labelsValue) => {
    const current =
      getValues(`columns.${columnId}.cards.${taskId}.labels`) || [];

    const exists = current.includes(labelsValue);

    if (exists) {
      const index = current.findIndex((l) => l === labelsValue);
      if (index !== -1) removeLabel(index);
    } else {
      appendLabel(labelsValue);
    }
  };

  return (
    <div className="absolute bg-white w-90 min-h-40 max-h-fit rounded-xl top-6 left-0 border border-gray-300 px-3 p-2 flex flex-col">
      <div className="flex flex-row w-full justify-between items-center px-2 py-1">
        <div className="text-center w-full">Labels</div>

        <div
          className="cursor-pointer "
          onClick={() => setOpenLabelModal(false)}
          title="Close Label Modal"
        >
          <img className="size-5" src="/cross.png" alt="cross" />
        </div>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        {labels?.length > 0 &&
          labels?.map((label) => {
            return (
              <div
                key={label._id}
                className=" flex flex-row gap-2 items-center"
              >
                <input
                  type="checkbox"
                  className="size-5 cursor-pointer"
                  checked={(
                    getValues(`columns.${columnId}.cards.${taskId}.labels`) ||
                    []
                  ).includes(label.labels)}
                  onChange={() =>
                    handleCheckBox(columnId, taskId, label?.labels)
                  }
                />
                <div className="bg-blue-400 text-white font-normal text-[15px] px-2 py-0.5 rounded-md w-full">
                  {label?.labels}
                </div>
                <img
                  src="/edit.png"
                  alt="edit"
                  className="invert size-5  cursor-pointer"
                  onClick={() => handleLabelEdit(label)}
                />
                <img
                  src="/cross.png"
                  alt="cross"
                  className="size-5  cursor-pointer"
                  onClick={() => handleLabelDelete(label?._id)}
                />
              </div>
            );
          })}
      </div>
      {showInput && (
        <div className="self-center w-full">
          <input
            placeholder="Label Title"
            type="text"
            className="focus:outline-[0.5px] bg-gray-50 focus:bg-white border-[0.5px] border-gray-300 shadow-sm focus:outline-blue-300 px-2 py-0.5 rounded-md w-[92%] mx-3 my-2"
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
            required
          />
        </div>
      )}
      <div className="self-center w-full">
        <button
          type="button"
          onClick={() => {
            showInput ? handleSubmit() : dispatch(setShowInput(true));
          }}
          className="text-center bg-gray-200 text-gray-700 hover:bg-gray-200 cursor-pointer w-[92%] px-3 py-1 rounded-md mx-3 my-2"
        >
          {showInput ? "Save Label" : "Create a new Label"}
        </button>
      </div>
    </div>
  );
};
