import { calculateWinner } from "./calculateWinner";

const findBestMove = (dp, squares) => {
  const state = squares.reduce(
    (total, cval, currIndex) =>
      total +
      (cval === null ? 0 : cval === "X" ? 1 : 2) * Math.pow(3, currIndex)
  );
  if (dp[state] !== undefined) {
    return dp[state];
  }
  let drawing = [];

  const currMove =
    squares.filter((sq) => sq !== null).length % 2 === 0 ? "X" : "O";
  let countValidMoves = squares.filter((sq) => sq === null).length;
  if (countValidMoves === 0) {
    dp[state] = { hintMoveStatus: "draw", hintMove: -1 };
    return dp[state];
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = currMove;
      if (calculateWinner(squares)) {
        squares[i] = null;
        dp[state] = { hintMoveStatus: "winning", hintMove: i };
        return dp[state];
      }
      squares[i] = null;
    }
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = currMove;
      let res = findBestMove(dp, squares);
      squares[i] = null;
      if (res.hintMoveStatus === "draw") {
        drawing.push(i);
      } else if (res.hintMoveStatus === "winning") {
        countValidMoves--;
      } else {
        dp[state] = { hintMoveStatus: "winning", hintMove: i };
        return dp[state];
      }
    }
  }
  if (drawing.length > 0) {
    dp[state] = {
      hintMoveStatus: "draw",
      hintMove: drawing[0],
    };
    return dp[state];
  }
  let bestLosingMove = squares.findIndex((sq) => sq === null);
  squares[bestLosingMove] = currMove;
  let winner = null;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = currMove === "X" ? "O" : "X";
      winner = calculateWinner(squares);
      squares[i] = null;
      if (winner !== null) {
        break;
      }
    }
  }
  squares[bestLosingMove] = null;
  if (winner !== null) {
    bestLosingMove = squares[winner[0]]
      ? squares[winner[1]]
        ? winner[2]
        : winner[1]
      : winner[0];
  }
  dp[state] = {
    hintMoveStatus: "losing",
    hintMove: bestLosingMove,
  };
  return dp[state];
};

export { findBestMove };
