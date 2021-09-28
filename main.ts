import { position, numToPos } from "./numberToPosition.ts";
import { isXWinner, isDraw } from "./winConditions.ts";

export type piece = "X" | "O" | " ";

export type row<T> = [T, T, T];

export type board<T> = [row<T>, row<T>, row<T>];

export type stateOfGame = "win" | "running" | "draw";

export interface gameState {
  board: board<piece>;
  player: piece;
  stateOfGame: stateOfGame;
}

const startingState: gameState = {
  board: [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ],
  player: "X",
  stateOfGame: "running",
};

const getInput = (player: piece): string => {
  if (player === " ") {
    throw "wrong input";
  } else {
    const input = prompt(`make a move player ${player}`);
    if (typeof input === "string") {
      return input;
    } else throw "input is undefined";
  }
};

const parseInput = (input: string): position => {
  const stringInput = /[1-9]{1}/.exec(input);
  if (stringInput !== null) {
    const intInput = +stringInput[0];
    return numToPos[intInput - 1];
  } else throw "wrong input";
};

const makeMove = (
  board: board<piece>,
  player: piece,
  pos: position
): board<piece> => {
  const x = pos.x;
  const y = pos.y;
  const newBoard: board<piece> = [...board];
  if (newBoard[x][y] === " ") {
    newBoard[x][y] = player;
  } else throw "pice already there";
  return newBoard;
};

const swapPlayers = (player: piece): piece => {
  if (player === "O") {
    return "X";
  } else if (player === "X") {
    return "O";
  } else throw "wrong pice";
};

const printBoard = <T>(b: board<T>): void => {
  console.log(
    `${b[2][0]}|${b[2][1]}|${b[2][2]}\n-+-+-\n${b[1][0]}|${b[1][1]}|${b[1][2]}\n-+-+-\n${b[0][0]}|${b[0][1]}|${b[0][2]}`
  );
};

const updateGameState = (state: gameState): gameState => {
  const newBoard = makeMove(
    state.board,
    state.player,
    parseInput(getInput(state.player))
  );
  const newPlayer = swapPlayers(state.player);
  const playerWin: stateOfGame = isXWinner(state.board, state.player)
    ? "win"
    : isDraw(state.board)
    ? "draw"
    : "running";
  return { board: newBoard, player: newPlayer, stateOfGame: playerWin };
};

const main = (gameState: gameState): void => {
  console.clear();
  printBoard(gameState.board);
  try {
    const newGameState = updateGameState(gameState);
    if (newGameState.stateOfGame === "running") {
      main(newGameState);
    } else if (newGameState.stateOfGame === "win") {
      console.clear();
      printBoard(newGameState.board);
      console.log(`${swapPlayers(newGameState.player)} has won!`);
      prompt("press enter to continue");
      return;
    } else if (newGameState.stateOfGame === "draw") {
      console.clear();
      printBoard(newGameState.board);
      console.log("its a draw");
      prompt("press enter to continue");
      return;
    } else throw "somtin wong";
  } catch (error) {
    console.log(error);
    main(gameState);
  }
};

main(startingState);
