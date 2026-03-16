import React from "react";
import { Input } from "./ui/Input";
import { useFieldArray } from "react-hook-form";
import { Droppable, Draggable } from "@hello-pangea/dnd";

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
    <div className="w-70 bg-gray-100 border border-gray-300 rounded-xl p-3 shrink-0 shadow-md hover:shadow-lg h-fit  hover:border-blue-300 focus-within:border-blue-300 ">
      <div className="flex justify-between items-center mb-3">
        {isEdit || isEditColumnTitle[columnIndex] ? (
          <div className="flex flex-row gap-2 text-[17px] font-semibold text-gray-700">
            <Input
              placeholder="Column Title"
              className="focus:outline-[0.5px] bg-gray-50 focus:bg-white border-[0.5px] border-gray-300 shadow-sm focus:outline-blue-300 px-2 py-0.5 rounded-md "
              {...register(`columns.${columnIndex}.title`, {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
            />
            <button
              className="cursor-pointer"
              onClick={() => remove(columnIndex)}
            >
              <img src="/cross.png" alt="cross" />
            </button>
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
            className="flex flex-col gap-3 min-h-3"
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
                      <div className="flex flex-row gap-1 border-[0.5px] border-gray-300 focus:border-blue-300  hover:border-blue-300 rounded-lg focus-within:border-blue-300 bg-gray-50 focus-within:bg-white">
                        <Input
                          className="w-56 h-9 pl-2 pr-1 focus:outline-none "
                          placeholder="Task"
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
                        {card?.labels?.length > 0 && (
                          <div className="px-2 py-1 bg-gray-50 rounded-lg text-xs flex flex-row flex-wrap gap-1 ">
                            {card?.labels?.map((label, index) => {
                              return (
                                <div
                                  key={index}
                                  className="bg-blue-400 w-fit rounded-md px-1 text-white m-0.5"
                                >
                                  {label}
                                </div>
                              );
                            })}
                          </div>
                        )}

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
                          className="bg-gray-50 p-2 min-h-9 rounded-lg shadow-sm hover:border-[0.5px] hover:border-blue-300 text-wrap wrap-anywhere"
                        >
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

      <button
        type="button"
        onClick={() => {
          append({ title: "" });
          setLastCardEdit();
        }}
        className="mt-3 ml-3 font-medium text-gray-600 hover:text-black text-[15px] cursor-pointer px-2 py-1 rounded-md hover:bg-gray-200 flex flex-row gap-1"
      >
        <img className="size-4" src="/plus.png" alt="plus" />
        <p className=" "> Add a card</p>
      </button>
    </div>
  );
};
