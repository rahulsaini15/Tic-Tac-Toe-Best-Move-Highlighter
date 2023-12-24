import { useCallback, useState, useRef } from "react";
import Board from "../board/Board";
import { calculateWinner } from "../../helpers/calculateWinner";
import { findBestMove } from "../../helpers/findBestMove";
import styles from "./game.module.css";
const Game = () => {
  const [data, setData] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
    showBestMove: false,
  });
  const dp = useRef(Array(20000));

  const handleClick = useCallback(
    (i) => {
      const history = data.history.slice(0, data.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = data.xIsNext ? "X" : "O";
      setData({
        ...data,
        history: history.concat([{ squares: squares }]),
        stepNumber: history.length,
        xIsNext: !data.xIsNext,
      });
    },
    [data]
  );

  const toggleCheckbox = useCallback(() => {
    setData({
      ...data,
      showBestMove: !data.showBestMove,
    });
  }, [data]);

  const jumpTo = useCallback(
    (step) => {
      setData({
        ...data,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    },
    [data]
  );

  const history = data.history;
  const current = history[data.stepNumber];
  const winner = calculateWinner(current.squares);

  const { hintMoveStatus, hintMove } =
    winner === null && data.showBestMove
      ? findBestMove(dp.current, current.squares)
      : [null, null];

  const status = winner
    ? "Winner: " + current.squares[winner[0]]
    : current.squares.some((val) => val === null)
    ? "Next player: " + (data.xIsNext ? "X" : "O")
    : "Draw";
  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    const moveStyle = {
      fontWeight: data.stepNumber === move ? "bold" : "normal",
    };

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} style={moveStyle}>
          {desc}
        </button>
      </li>
    );
  });
  return (
    <div className={styles.game}>
      <div className={styles["game-board"]}>
        <Board
          squares={current.squares}
          onClick={handleClick}
          lastMove={
            data.stepNumber === 0
              ? null
              : current.squares.findIndex(
                  (cval, currIndex) =>
                    data.history[data.stepNumber - 1].squares[currIndex] !==
                    current.squares[currIndex]
                )
          }
          winner={winner}
          hintMove={hintMove}
          hintMoveStatus={hintMoveStatus}
          toggleCheckbox={toggleCheckbox}
        />
      </div>
      <div className={styles["game-info"]}>
        <div className={styles.status}>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
