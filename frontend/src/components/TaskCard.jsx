import React from "react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useFieldArray } from "react-hook-form";
import { Input } from "./ui/Input";
import { LabelModal } from "./LabelModal";

export const TaskCard = ({
  openTaskModal,
  setOpenTaskModal,
  board,
  register,
  control,
  getValues,
}) => {
  const { columnId, taskId } = openTaskModal;
  const [openLabelModal, setOpenLabelModal] = useState(false);

  const {
    fields,
    append: appendLabel,
    remove: removeLabel,
  } = useFieldArray({
    control,
    name: `columns.${columnId}.cards.${taskId}.labels`,
  });

  return (
    <div className="absolute z-50 top-0 left-0 w-full min-h-full max-h-fit bg-black/30 flex justify-center ">
      <div className="bg-white w-160 min-h-90 max-h-fit rounded-xl my-4 mx-2">
        <div className="h-14 w-full border-b border-gray-300 px-4 py-2 flex flex-row gap-3 justify-between items-center">
          <div className="text-[18px] px-2 font-semibold text-gray-800">
            {board.columns[columnId].title}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setOpenTaskModal(null)}
            title="Close Task Modal"
          >
            <img className="size-6" src="/cross.png" alt="cross" />
          </div>
        </div>
        <div className="flex flex-row gap-3 mx-8 my-6 items-center">
          <input
            type="checkbox"
            title="Mark task as completed"
            className="cursor-pointer size-5  "
            {...register(`columns.${columnId}.cards.${taskId}.isComplete`)}
          />

          <div className="text-[18px] font-bold text-gray-600 w-full">
            <Input
              placeholder="Task Title"
              title="Task Title"
              className="px-2 py-1 bg-gray-100 focus:outline-[1.5px] focus:outline-blue-400 rounded-md w-full focus:bg-white placeholder:font-medium"
              {...register(`columns.${columnId}.cards.${taskId}.title`, {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
            />
          </div>
        </div>
        <div className="mx-6 my-4 text-md font-semibold relative">
          <p>Labels</p>
          <div className="flex gap-3 flex-wrap wrap-anywhere w-full">
            {fields.map((label, index) => {
              return (
                <div key={label.id} className="flex flex-row gap-2">
                  <div className=" w-full flex flex-row gap-1 border border-gray-300 focus:border-blue-400  hover:border-blue-400 rounded-lg focus-within:outline focus-within:outline-blue-400 focus-within:border-blue-400 bg-gray-50 focus-within:bg-white">
                    <Input
                      className="w-38  h-7 pl-2 pr-1 focus:outline-none "
                      placeholder="Label"
                      title="Mark task with Labels"
                      {...register(
                        `columns.${columnId}.cards.${taskId}.labels.${index}`,
                        {
                          required: true,
                          setValueAs: (v) => v.trim(),
                        }
                      )}
                    />
                    <button
                      className="cursor-pointer"
                      onClick={() => removeLabel(index)}
                      type="button"
                      title="Remove Label"
                    >
                      <img className="size-4" src="/cross.png" alt="cross" />
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              className="cursor-pointer bg-gray-200 px-2 rounded-md hover:bg-gray-300 h-7"
              // onClick={() => appendLabel("")}
              onClick={() => {
                setOpenLabelModal(true);
              }}
              type="button"
              title="Add Label"
            >
              <img className="size-4" src="/plus.png" alt="plus" />
            </button>
          </div>
          {openLabelModal && (
            <LabelModal
              setOpenLabelModal={setOpenLabelModal}
              appendLabel={appendLabel}
              removeLabel={removeLabel}
              getValues={getValues}
              columnId={columnId}
              taskId={taskId}
            />
          )}
        </div>
        <div className="mx-6 my-4 text-md font-semibold">
          <p className="pb-0.5">Description</p>
          <textarea
            className="text-md font-medium px-2 py-1 border border-gray-300 focus:border-blue-400 bg-gray-50 focus:outline focus:outline-blue-400 rounded-md focus:bg-white w-full h-20 "
            placeholder="Add a more detailed description..."
            title="Add description of Task"
            {...register(`columns.${columnId}.cards.${taskId}.description`, {
              required: true,
              setValueAs: (v) => v.trim(),
            })}
          ></textarea>
          <div className="flex mt-1 flex-row gap-3">
            <Button
              title="Save Task Details"
              type="submit"
              className="w-14 px-2 py-0.5 rounded-md bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button
              onClick={() => setOpenTaskModal(null)}
              type="button"
              className="w-16 bg-white hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md"
              title="Close Task Modal"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
