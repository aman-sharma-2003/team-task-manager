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
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Board = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.board);

  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
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

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    const columns = [...getValues("columns")];

    if (type === "COLUMN") {
      const [removed] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, removed);

      reset({
        boardTitle: getValues("boardTitle"),
        columns,
      });

      dispatch(
        updateBoard({
          id,
          data: {
            title: getValues("boardTitle"),
            columns,
          },
        })
      );

      return;
    }

    const sourceColIndex = source.droppableId.split("-")[1];
    const destColIndex = destination.droppableId.split("-")[1];

    const sourceCards = [...columns[sourceColIndex].cards];
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCards.splice(destination.index, 0, movedCard);
      columns[sourceColIndex].cards = sourceCards;
    } else {
      const destCards = [...columns[destColIndex].cards];
      destCards.splice(destination.index, 0, movedCard);

      columns[sourceColIndex].cards = sourceCards;
      columns[destColIndex].cards = destCards;
    }

    reset({
      boardTitle: getValues("boardTitle"),
      columns,
    });
    dispatch(
      updateBoard({
        id,
        data: {
          title: getValues("boardTitle"),
          columns,
        },
      })
    );
  };

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
        <div className="h-15 flex items-center justify-between px-2 sm:px-6 shadow">
          {isEdit ? (
            <Input
              placeholder="Board Title"
              {...register("boardTitle", {
                required: true,
              })}
            />
          ) : (
            <h1
              onDoubleClick={() => setIsEdit(true)}
              className="text-lg font-semibold sm:pl-5"
            >
              {board?.title || "My Board"}
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="columns"
              direction="horizontal"
              type="COLUMN"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-5 p-6 min-h-fit"
                >
                  {fields.map((col, index) => (
                    <Draggable
                      key={col.id}
                      draggableId={String(col.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ColumnCard
                            register={register}
                            isEdit={isEdit}
                            col={col}
                            columnIndex={index}
                            control={control}
                            remove={remove}
                            setIsEdit={setIsEdit}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  {isEdit && (
                    <div className="w-70 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          append({ title: "", cards: [{ title: "" }] })
                        }
                        className="w-70 h-15 rounded-xl border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-600 font-semibold hover:bg-gray-100"
                      >
                        + Add another list
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </form>
    </div>
  );
};

export default Board;
