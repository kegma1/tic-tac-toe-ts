import { row, board, piece } from "./main.ts";

const rotateBoard = <T>(b: board<T>): board<T> => {
  return [
    [b[0][2], b[1][2], b[2][2]],
    [b[0][1], b[1][1], b[2][1]],
    [b[0][0], b[1][0], b[2][0]],
  ];
};

type dir = "left" | "right";

const findDiagonal = <T>(b: board<T>, dir: dir): row<T> => {
  if (dir === "left") {
    return [b[2][0], b[1][1], b[0][2]];
  } else if (dir === "right") {
    return [b[0][0], b[1][1], b[2][2]];
  } else throw "wrong dir";
};

const isRowEqual = <T>(row: row<T>, x: T): boolean => {
  return row.every((v) => v === x);
};

const areRowsEqual = <T>(board: board<T>, x: T): boolean => {
  return board.some((v) => isRowEqual(v, x));
};

const areColsEqual = <T>(board: board<T>, x: T): boolean => {
  return areRowsEqual(rotateBoard(board), x);
};

const areDiagonalsEqual = <T>(board: board<T>, x: T): boolean => {
  const leftDiag = findDiagonal(board, "left");
  const rightDiag = findDiagonal(board, "right");
  return isRowEqual(leftDiag, x) || isRowEqual(rightDiag, x);
};

export const isXWinner = <T>(board: board<T>, x: T): boolean => {
  return (
    areRowsEqual(board, x) ||
    areColsEqual(board, x) ||
    areDiagonalsEqual(board, x)
  );
};

export const isDraw = (board: board<piece>): boolean => {
  return board.every( v => v.every( b => b !== " "))
};
