// src/components/Square.js
import React from "react";

function Square({ value, onClick, isWinningSquare }) {
  return (
    
    <button
      className={`square ${isWinningSquare ? "winning" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
 
  );
}

export default Square;
