import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate, useParams, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ColumnCard } from "../components/ColumnCard";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "../components/ui/Input";
import {
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
} from "../features/boardSlice";

const Board = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.board);

  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      boardTitle: "",
      columns: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  useEffect(() => {
    if (location.pathname === "/board/new") {
      setIsEdit(true);
      append({ title: "", cards: [{ title: "" }] });
    }

    if (id) {
      dispatch(getBoard(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (board && board.columns) {
        const formattedData = {
          boardTitle: board.title,
          columns: board.columns || [],
        };
        reset(formattedData);
      }
    }
  }, [board]);

  const submitted = (data) => {
    if (id && isEdit) {
      dispatch(updateBoard({ id, data }));
      setIsEdit(false);
    }

    if (location.pathname === "/board/new" && isEdit) {
      dispatch(createBoard(data));
      navigate("/home");
    }
    reset();
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(id));
    navigate("/home");
  };

  return (
    <div className="w-full flex flex-col">
      <form onSubmit={handleSubmit(submitted)}>
        <div className="h-15 flex items-center justify-between px-6 shadow">
          {isEdit ? (
            <Input placeholder="Board Title" {...register("boardTitle")} />
          ) : (
            <h1 className="text-lg font-semibold">
              {board?.board?.title || "My Board"}
            </h1>
          )}

          <div className="flex flex-row gap-3">
            <Button type="submit" className="max-w-20 px-2 py-1">
              Save
            </Button>

            {id && !isEdit && (
              <Button
                type="button"
                onClick={() => setIsEdit(true)}
                className="max-w-20 px-2 py-1"
              >
                Edit
              </Button>
            )}
            {id && !isEdit && (
              <Button
                type="button"
                onClick={handleDeleteBoard}
                className="max-w-20 px-2 py-1"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto min-h-[calc(100vh-124px)]">
          <div className="flex gap-5 p-6 min-h-fit">
            {fields.map((col, index) => (
              <ColumnCard
                key={col.id}
                register={register}
                isEdit={isEdit}
                col={col}
                columnIndex={index}
                control={control}
                remove={remove}
              />
            ))}

            {isEdit && (
              <div className="w-70 shrink-0">
                <button
                  type="button"
                  onClick={() => append({ title: "", cards: [{ title: "" }] })}
                  className="w-70 h-15 rounded-xl border-2 border-dashed border-gray-400 
                flex items-center justify-center text-gray-600 font-semibold 
                hover:bg-gray-100 cursor-pointer"
                >
                  + Add another list
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Board;
