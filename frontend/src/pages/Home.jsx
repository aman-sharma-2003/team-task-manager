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
    <div>
      {boards.length === 0 && (
        <p className="text-gray-600 font-semibold pt-6 px-6">
          No Boards to show. Create one first.
        </p>
      )}
      <div className="flex gap-5 flex-wrap p-6">
        {boards?.map((b) => (
          <BoardCard key={b._id} board={b} />
        ))}

        <button
          onClick={handleCreateBoard}
          className="w-73 h-46 rounded-xl border-2 border-dashed border-gray-400 
          flex items-center justify-center text-gray-600 font-semibold 
          hover:bg-gray-100 transition cursor-pointer"
        >
          + Create new board
        </button>
      </div>
    </div>
  );
};

export default Home;
