export default function Square({ value, highlight, onSquareClick, index }) {
  let className = "square";
  if (highlight) {
    className = `${className} highlight`;
  }
  return (
    <button className={className} onClick={() => onSquareClick(index)}>
      {value}
    </button>
  );
}
