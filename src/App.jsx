import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(0).fill(null)]);
  const [move, setMove] = useState(0);
  const isXTurn = move % 2 === 0;
  const currentSquares = history[move];

  const handlePlay = (squares) => {
    let updatedHistory = [...history];
    const currentMove = move + 1;
    updatedHistory[currentMove] = squares;
    setHistory(updatedHistory);
    setMove(currentMove);
  };

  const jumpTo = (move) => {
    setMove(move);
  };

  const moves = history.map((__, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div>
        <Board squares={currentSquares} isXTurn={isXTurn} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
