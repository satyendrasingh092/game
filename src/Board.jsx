import Square from "./Square";

function calculateWinners(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 7, 8],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const winningLine = winningLines[i];
    const [a, b, c] = winningLine;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { [squares[a]]: winningLine };
    }
  }
  return null;
}

export default function Board({ squares, isXTurn, onPlay }) {
  const handleClick = (i) => {
    const winner = calculateWinners(squares);
    if (squares[i] || winner) {
      return;
    }
    const move = isXTurn ? "X" : "O";
    const updatedSquares = [...squares];
    updatedSquares[i] = move;
    onPlay(updatedSquares);
  };

  const getSquareRow = (start, end, winningLine) => {
    let i = start;
    let row = [];
    while (i <= end) {
      row.push(
        <Square
          key={i}
          highlight={winningLine.includes(i)}
          value={squares[i]}
          index={i}
          onSquareClick={handleClick}
        />
      );
      i++;
    }
    return row;
  };

  const winner = calculateWinners(squares);
  let status;
  let winningLine = [];
  if (winner) {
    let key = Object.keys(winner)[0];
    winningLine = winner[key];
    status = `Winner: ${key}`;
  } else {
    const nextMove = isXTurn ? "X" : "O";
    status = `Next Player: ${nextMove}`;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div>
        <div className="board-row">{getSquareRow(0, 2, winningLine)}</div>
        <div className="board-row">{getSquareRow(3, 5, winningLine)}</div>
        <div className="board-row">{getSquareRow(6, 8, winningLine)}</div>
      </div>
    </>
  );
}
