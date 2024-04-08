import React from "react";

const StarFavorite = ({ filled, onClick }) => {
  return (
    <span
      className="star"
      style={{ cursor: "pointer", fontSize: "1.5em", fontWeight: "bold" }}
      onClick={onClick}
    >
      {filled ? "★" : "☆"}
    </span>
  );
};

export default StarFavorite;
