import { useRef } from "react";
import Square from "../square/Square";
import styles from "./board.module.css";

const Board = ({
  squares,
  onClick,
  lastMove,
  winner,
  hintMove,
  hintMoveStatus,
  toggleCheckbox,
}) => {
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        key={i}
        hintMove={i === hintMove}
        hintMoveStatus={i === hintMove ? hintMoveStatus : null}
        lastMove={i === lastMove}
        onClick={() => onClick(i)}
        winner={winner !== null && winner.indexOf(i) !== -1}
      />
    );
  };

  const squareIndexes = useRef([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]);

  return (
    <div>
      {squareIndexes.current.map((row, number) => {
        return (
          <div key={"row" + number.toString()} className={styles["board-row"]}>
            {row.map(renderSquare)}
          </div>
        );
      })}
      <input type="checkbox" id="showBestMove" onChange={toggleCheckbox} />
      <label htmlFor="showBestMove">Show best move</label>
    </div>
  );
};

export default Board;
