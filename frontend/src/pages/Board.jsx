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
import { TaskCard } from "../components/TaskCard";

const Board = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { board } = useSelector((state) => state.board);

  const [isEdit, setIsEdit] = useState(false);
  const [isEditBoardTitle, setIsEditBoardTitle] = useState(false);
  const [isEditColumnTitle, setIsEditColumnTitle] = useState({});
  const [isEditTask, setIsEditTask] = useState({});
  const [openTaskModal, setOpenTaskModal] = useState(null);

  const { register, handleSubmit, reset, control, getValues } = useForm({
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
      append({ title: ""});
      setIsEditColumnTitle({0:true});
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
            boardTitle: getValues("boardTitle"),
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
          boardTitle: getValues("boardTitle"),
          columns,
        },
      })
    );
  };

  const submitted = (data) => {
    console.log(data);
    if (id) {
      dispatch(updateBoard({ id, data }));
      setIsEdit(false);
      setIsEditBoardTitle(false);
      setIsEditColumnTitle({});
      setIsEditTask({});
      setOpenTaskModal(null);
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

  const setLastColumnEdit = () => {
    const newIndex = fields.length;
    setIsEditColumnTitle((prev) => ({ ...prev, [newIndex]: true }));

    setIsEditTask((prev) => ({
      ...prev,
      [newIndex]: {
        ...prev[newIndex],
        0: true,
      },
    }));
  };

  return (
    <div className="w-full flex flex-col relative">
      <form onSubmit={handleSubmit(submitted)}>
        {openTaskModal !== null && (
          <TaskCard
            openTaskModal={openTaskModal}
            setOpenTaskModal={setOpenTaskModal}
            board={board}
            register={register}
            control={control}
            getValues={getValues}
          />
        )}
        <div className="h-12 flex items-center justify-between px-2 sm:px-6 shadow bg-linear-to-r from-[#544797] to-[#784e93] border-b border-t border-gray-500">
          {isEdit || isEditBoardTitle ? (
            <Input
              placeholder="Board Title"
              title="Enter the Board Title here"
              className="text-lg font-semibold sm:ml-5 px-2 py-1 bg-gray-50 focus:outline focus:outline-blue-300 rounded-md focus:bg-white placeholder:font-medium placeholder:text-[17px]"
              {...register("boardTitle", {
                required: true,
                setValueAs: (v) => v.trim(),
              })}
            />
          ) : (
            <h1
              onClick={() => {
                setIsEditBoardTitle(true);
              }}
              className="text-lg text-white font-semibold px-2 py-1 rounded-md cursor-pointer sm:ml-3 hover:bg-[#d2d2d2]/30"
            >
              {board?.title || "My Board"}
            </h1>
          )}

          <div className="flex flex-row gap-3 sm:mr-5">
            {(isEdit ||
              isEditBoardTitle ||
              JSON.stringify(isEditColumnTitle) != "{}" ||
              JSON.stringify(isEditTask) != "{}") && (
              <Button
                type="submit"
                title="Click to save the changes"
                className="w-15 px-1 rounded-sm py-0 text-gray-600 hover:text-gray-700 font-medium bg-gray-300  hover:bg-gray-100"
              >
                Save
              </Button>
            )}
            {id && !isEdit && (
              <Button
                type="button"
                title="Click to delete the board"
                onClick={handleDeleteBoard}
                className="w-15 px-1 rounded-sm py-0 text-gray-600 hover:text-gray-700 font-medium bg-gray-300  hover:bg-gray-100"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto min-h-[calc(100vh-101px)] bg-linear-to-r from-[#765ec5] via-[#b16ac0] to-[#e173bb]">
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
                            isEditColumnTitle={isEditColumnTitle}
                            setIsEditColumnTitle={setIsEditColumnTitle}
                            isEditTask={isEditTask}
                            setIsEditTask={setIsEditTask}
                            setOpenTaskModal={setOpenTaskModal}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="w-70 shrink-0">
                    <button
                      type="button"
                      title="Click to add more column lists"
                      onClick={() => {
                        append({ title: "" });
                        setLastColumnEdit();
                      }}
                      className="w-70 h-15 rounded-xl cursor-pointer border border-gray-400 shadow-md  flex items-center justify-center text-white font-semibold bg-[#bc8cd0] hover:bg-[#b27bca] hover:shadow-lg gap-2"
                    >
                      <img className="size-4" src="/plusWhite.png" alt="plus" />
                      <p className="mt-1">Add another list</p>
                    </button>
                  </div>
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
