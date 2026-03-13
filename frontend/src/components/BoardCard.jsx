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
      className="w-73 h-46 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:border border-blue-400 transition"
    >

      <div
        className="h-33 w-full bg-cover bg-center"
        style={{
          backgroundImage: board.background
            ? `url(${board.background})`
            : "linear-gradient(135deg,#667eea,#f093fb)",
        }}
      />

      <div className="p-3 bg-white">
        <h3 className="text-gray-800 font-semibold text-lg">{board.title}</h3>
      </div>
    </div>
  );
};

export default BoardCard;
