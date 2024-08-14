// src/components/Game.js
import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [winnerCounted, setWinnerCounted] = useState(false);

  const current = history[stepNumber] || { squares: Array(9).fill(null) }; // Fix added here
  const result = calculateWinner(current.squares);
  const winner = result ? result.winner : null;
  const winningSquares = result ? result.line : [];

  useEffect(() => {
  if (winner && !winnerCounted) {
    // If there's a winner, update win count and reset the game
    if (winner === "X") {
      setXWins(xWins + 1);
    } else if (winner === "O") {
      setOWins(oWins + 1);
    }
    setWinnerCounted(true);

    // Automatically reset the game after a round is completed
    setTimeout(() => {
      resetGame();
    }, 3000); // Adjust the timeout duration as needed
  } else if (!winner && stepNumber === 9) {
    // If it's a draw (no winner and all squares filled)
    setTimeout(() => {
      // Show a pop-up animation with a "Try Again" prompt
      alert("It's a draw! Try again.");
      resetGame();
    }, 1000); // Adjust the timeout duration as needed
  }
}, [winner, winnerCounted, xWins, oWins, stepNumber]);

const resetGame = () => {
  setHistory([{ squares: Array(9).fill(null) }]);
  setStepNumber(0);
  setXIsNext(true);
  setWinnerCounted(false);
};

  const handleClick = (i) => {
    const historyUpToCurrent = history.slice(0, stepNumber + 1);
    const currentSquares =
      historyUpToCurrent[historyUpToCurrent.length - 1].squares.slice();

    if (winner || currentSquares[i]) {
      return;
    }

    currentSquares[i] = xIsNext ? "X" : "O";
    setHistory(historyUpToCurrent.concat([{ squares: currentSquares }]));
    setStepNumber(historyUpToCurrent.length);
    setXIsNext(!xIsNext);
    setWinnerCounted(false);
  };

  const stepBack = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setXIsNext(stepNumber % 2 === 0);
      setWinnerCounted(false);
    }
  };

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>Player X Wins: {xWins}</div>
        <div>Player O Wins: {oWins}</div>
        <button class="step-back-button" onClick={stepBack}>
          Step Back
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}

export default Game;
