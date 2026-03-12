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
  setIsEdit = { setIsEdit },
}) => {
  const {
    fields,
    append,
    remove: removeCard,
  } = useFieldArray({
    control,
    name: `columns.${columnIndex}.cards`,
  });

  return (
    <div className="w-70 bg-gray-100 rounded-xl p-3 shrink-0 shadow-md hover:shadow-lg h-fit">
      <div className="flex justify-between items-center mb-3">
        {isEdit ? (
          <div className="flex flex-row gap-5">
            <Input
              placeholder="Column Title"
              {...register(`columns.${columnIndex}.title`, {
                required: true,
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
            onDoubleClick={() => setIsEdit(true)}
            className="font-semibold text-gray-700"
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
                    {isEdit ? (
                      <div className="flex flex-row gap-2 ">
                        <Input
                          className="w-56 h-9 px-2 focus:border rounded-lg"
                          placeholder="Task"
                          {...register(
                            `columns.${columnIndex}.cards.${index}.title`,
                            {
                              required: true,
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
                      <div
                        onDoubleClick={() => setIsEdit(true)}
                        className="bg-white p-2 h-9 rounded-lg shadow-sm"
                      >
                        {card.title}
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

      {isEdit && (
        <button
          type="button"
          onClick={() => {
            append({ title: "" });
          }}
          className="mt-3 ml-3 font-medium text-gray-600 hover:text-black text-sm"
        >
          + Add a card
        </button>
      )}
    </div>
  );
};
