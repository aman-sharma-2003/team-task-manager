import React from "react";
import { useState } from "react";
import { Button } from "./ui/Button";

export const TaskCard = ({
  openTaskModal,
  setOpenTaskModal,
  board,
  register,
}) => {
  const { columnId, taskId } = openTaskModal;
  const [isComplete, setIsComplete] = useState(
    board.columns[columnId].cards[taskId].isComplete || false
  );
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center ">
      <div className="bg-white w-160 h-90 rounded-xl ">
        <div className="h-14 w-full border-b border-gray-300 px-4 py-2 flex flex-row gap-3 justify-between items-center">
          <div className="text-[18px] px-2 font-semibold text-gray-800">
            {board.columns[columnId].title}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setOpenTaskModal(null)}
          >
            <img className="size-6" src="/cross.png" alt="cross" />
          </div>
        </div>
        <div className="flex flex-row gap-2 mx-8 my-6 items-center">
          <input
            type="checkbox"
            className="cursor-pointer size-4"
            {...register(
              `board.columns.${columnId}.cards.${taskId}.isComplete`
            )}
          />

          <div className="text-2xl font-bold text-gray-800">
            {board.columns[columnId].cards[taskId].title}
          </div>
        </div>
        <div className="mx-6 my-4 text-md font-semibold">
          <p>Labels</p>
        </div>
        <div className="mx-6 my-4 text-md font-semibold">
          <p className="pb-3">Description</p>
          <textarea
            className="text-md font-medium px-2 py-1 border focus:border-blue-400 bg-gray-50 focus:outline focus:outline-blue-400 rounded-md focus:bg-white w-full h-20"
            placeholder="Add a more detailed description..."
            {...register(
              `board.columns.${columnId}.cards.${taskId}.description`,
              {
                required: true,
                setValueAs: (v) => v.trim(),
              }
            )}
          ></textarea>
          <div className="flex mt-1 flex-row gap-3">
            <Button className="max-w-14  px-2 py-1 rounded-md">Save</Button>
            <Button className="max-w-16 bg-white hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
