import BoardCard from "../components/BoardCard";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoards } from "../features/boardSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { boards } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(getBoards());
  }, []);

  const handleCreateBoard = () => {
    navigate("/board/new");
  };

  return (
    <div className="min-h-[calc(100vh-53px)] max-h-fit bg-linear-to-r from-[#9784d6] via-[#c88fd3] to-[#f09dd3]">
      {boards.length === 0 && (
        <p className="text-gray-600 font-semibold pt-6 px-6">
          No Boards to show. Create one first.
        </p>
      )}
      <div className="text-[18px] text-gray-600 font-bold px-8 pt-5 pb-3">
        My Boards
      </div>
      <div className="flex flex-row justify-start gap-5 flex-wrap px-6">
        {boards?.map((b) => (
          <BoardCard key={b._id} board={b} />
        ))}

        <button
          onClick={handleCreateBoard}
          title="Click to create a new board"
          className="w-73 h-46 rounded-xl border-2 border-dashed border-gray-400 
          flex items-center justify-center gap-1 text-gray-600 font-semibold  bg-gray-100
          hover:bg-gray-200 transition hover:shadow-xl cursor-pointer "
        >
          <img className="size-3.5" src="/plus.png" alt="plus" />
          <p className="mt-1">Create new board</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
