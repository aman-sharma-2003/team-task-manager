import React from "react";
import { Input } from "./ui/Input";
import { useFieldArray } from "react-hook-form";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "../utils/style";
import { Button } from "./ui/Button";

export const ColumnCard = ({
  register,
  isEdit,
  col,
  columnIndex,
  control,
  remove,
  isEditColumnTitle,
  setIsEditColumnTitle,
  isEditTask,
  setIsEditTask,
  setOpenTaskModal,
}) => {
  const {
    fields,
    append,
    remove: removeCard,
  } = useFieldArray({
    control,
    name: `columns.${columnIndex}.cards`,
  });

  const setLastCardEdit = () => {
    const newIndex = fields.length;
    setIsEditTask((prev) => ({
      ...prev,
      [columnIndex]: {
        ...prev[columnIndex],
        [newIndex]: true,
      },
    }));
  };

  const showTaskModal = (columnIndex, index) => {
    setOpenTaskModal({ columnId: columnIndex, taskId: index });
  };

  return (
    <div className="w-70 bg-gray-100 border border-gray-300 rounded-xl p-3 shrink-0 shadow-md hover:shadow-lg h-fit  hover:border-blue-400 focus-within:border-blue-300 ">
      <div className="flex justify-between items-center mb-2">
        {isEdit || isEditColumnTitle[columnIndex] ? (
          <div className="flex flex-row gap-2 text-[17px] font-semibold text-gray-700">
            <Input
              placeholder="Enter List Name"
              title="Enter the List Title here"
              className="focus:outline-2 bg-gray-50 focus:bg-white border-[0.5px] border-gray-300 shadow-sm focus:outline-blue-400 px-2 py-0.5 rounded-md placeholder:text-[15px] w-63"
              {...register(`columns.${columnIndex}.title`, {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
            />
            {/* <button
              className="cursor-pointer"
              onClick={() => remove(columnIndex)}
            >
              <img src="/cross.png" alt="cross" />
            </button> */}
          </div>
        ) : (
          <h2
            onClick={() => {
              setIsEditColumnTitle((prev) => ({
                ...prev,
                [columnIndex]: true,
              }));
            }}
            className=" text-[17px] font-semibold text-gray-700 hover:cursor-pointer hover:bg-gray-200 px-2 py-0.5 rounded-md"
          >
            {col.title}
          </h2>
        )}
      </div>

      <Droppable droppableId={`column-${columnIndex}`} type="CARD">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3 min-h-1"
          >
            {fields.map((card, index) => (
              <Draggable
                key={card.id}
                draggableId={String(card.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="rounded-lg shadow-sm"
                  >
                    {isEdit || isEditTask[columnIndex]?.[index] ? (
                      <div className="flex flex-row gap-1   focus:border-blue-400 border-2 border-transparent  hover:border-blue-400 rounded-lg focus-within:border-blue-300 bg-gray-50 focus-within:bg-white">
                        <Input
                          className="w-56 h-8 pl-2 pr-1 py-1 focus:outline-none text-gray-700 text-[15px] font-medium placeholder:font-medium"
                          placeholder="Enter a Title"
                          title="Enter the Task Title here"
                          {...register(
                            `columns.${columnIndex}.cards.${index}.title`,
                            {
                              required: true,
                              setValueAs: (v) => v.trim(),
                            }
                          )}
                        />
                        <button
                          className="cursor-pointer"
                          onClick={() => removeCard(index)}
                        >
                          <img width="18" src="/cross.png" alt="cross" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          onClick={() => {
                            showTaskModal(columnIndex, index);
                          }}
                          onContextMenu={(e) => {
                            e.preventDefault();
                            setIsEditTask((prev) => ({
                              ...prev,
                              [columnIndex]: {
                                ...prev[columnIndex],
                                [index]: true,
                              },
                            }));
                          }}
                          className="bg-gray-50 py-1 px-2 min-h-9 rounded-lg shadow-sm border-2 border-transparent hover:border-blue-400 text-wrap wrap-anywhere text-gray-700 text-[15px] font-medium group"
                        >
                          {card?.labels?.length > 0 && (
                            <div className=" bg-gray-50 rounded-lg text-xs flex flex-row flex-wrap gap-1 mb-1 ">
                              {card?.labels?.map((label, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="bg-blue-400 w-fit rounded-sm px-1.5 py-px text-white"
                                  >
                                    {label}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <img
                            className={cn(
                              "hidden size-5 mr-1",
                              card.isComplete && "inline"
                            )}
                            src={card.isComplete && "/check.png"}
                            alt="circle"
                          />
                          {card.title}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {!isEditColumnTitle[columnIndex] && !isEditTask[columnIndex] ? (
        <button
          type="button"
          title="Click to add more Task Cards"
          onClick={() => {
            append({ title: "" });
            setLastCardEdit();
          }}
          className="mt-3 font-medium text-gray-600 hover:text-black text-[15px] cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 flex flex-row items-center gap-1"
        >
          <img className="size-5" src="/plusIcon.png" alt="plus" />
          <p className="mt-1">Add a card</p>
        </button>
      ) : (
        <div className="flex flex-row gap-2 items-center  mt-3">
          <Button
            type="submit"
            title="Click to save the changes"
            className="w-15 px-1 rounded-sm py-0.5 text-white  font-medium bg-blue-500  hover:bg-blue-600"
          >
            Save
          </Button>
          <button
            className="cursor-pointer"
            onClick={() => remove(columnIndex)}
          >
            <img src="/cross.png" alt="cross" />
          </button>
        </div>
      )}
    </div>
  );
};
