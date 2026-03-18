import React from "react";
import { useNavigate } from "react-router";

const BoardCard = ({ board }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/board/${board._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-73 h-46 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl border border-gray-400  hover:border-blue-400 transition"
    >
      <div
        className="h-35 w-full bg-cover bg-center"
        style={{
          backgroundImage: board.background
            ? `url(${board.background})`
            : "linear-gradient(135deg,#667eea,#f093fb)",
        }}
      />

      <div className="py-3 px-5 bg-gray-50 hover:bg-gray-100">
        <h3 className="text-gray-800 font-semibold text-[16px]">
          {board.title}
        </h3>
      </div>
    </div>
  );
};

export default BoardCard;
