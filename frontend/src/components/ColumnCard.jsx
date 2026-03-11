import React from "react";
import { Input } from "./ui/Input";
import { useFieldArray } from "react-hook-form";

export const ColumnCard = ({
  register,
  isEdit,
  col,
  columnIndex,
  control,
  remove,
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
    <div className="w-70 bg-gray-100 rounded-xl p-3 shrink-0 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-center mb-3">
        {isEdit ? (
          <div className="flex flex-row gap-5">
            <Input
              placeholder="Column Title"
              {...register(`columns.${columnIndex}.title`)}
            />
            <button
              className="cursor-pointer"
              onClick={() => remove(columnIndex)}
            >
              <img src="/cross.png" alt="cross" />
            </button>
          </div>
        ) : (
          <h2 className="font-semibold text-gray-700">{col.title}</h2>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {fields.map((card, index) => (
          <div key={card.id} className="rounded-lg shadow-sm">
            {isEdit ? (
              <div className="flex flex-row gap-1 ">
                <Input
                  className="w-56 h-8 px-2"
                  placeholder="Task"
                  {...register(`columns.${columnIndex}.cards.${index}.title`)}
                />
                <button
                  className="cursor-pointer"
                  onClick={() => removeCard(index)}
                >
                  <img width="18" src="/cross.png" alt="cross" />
                </button>
              </div>
            ) : (
              <div className="bg-white p-2 rounded">{card.title}</div>
            )}
          </div>
        ))}
      </div>

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
