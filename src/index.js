import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { dimension } from "./constants.js";

//const dimension = 4;

// return True if game over
function gameOver() {
  return false;
}

// generates new num in random spot and updates board
function newNum(tiles) {
  let newTiles = tiles.slice();
  let row = Math.floor(Math.random() * dimension);
  let col = Math.floor(Math.random() * dimension);
  if (tiles[row][col] === 0) {
    newTiles[row][col] = 2;
  } else {
    newNum(tiles);
  }
  return newTiles;
}

function Tile(props) {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  let status = true; // later: replace status with timer
  let initialTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var [tiles, setTiles] = useState(initialTiles);
  const [gameOver, setGameOver] = useState(false);
  const pressed = useKeyPress();

  function renderTile(i, j) {
    return <Tile value={tiles[i][j]} onClick={() => updateBoard()} />;
  }
  function renderRow(i) {
    return (
      <div className="board-row">
        {renderTile(i, 0)}
        {renderTile(i, 1)}
        {renderTile(i, 2)}
        {renderTile(i, 3)}
      </div>
    );
  }
  function updateBoard() {
    setTiles(newNum(tiles));
    console.log(tiles);
  }
  useEffect(() => {
    updateBoard();
  }, [pressed]);

  return (
    <div>
      <div>{pressed}</div>
      <div className="status">{status}</div>
      {renderRow(0)}
      {renderRow(1)}
      {renderRow(2)}
      {renderRow(3)}
    </div>
  );
}

// key press handler using vim keys
function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState(null);

  function move({ key }) {
    let pressed = "";
    switch (key) {
      case "k":
        pressed = "up";
        break;
      case "j":
        pressed = "down";
        break;
      case "h":
        pressed = "left";
        break;
      case "l":
        pressed = "right";
        break;
      default:
        pressed = null;
        break;
    }
    setKeyPressed(pressed);
    console.log(`pressed ${pressed}`);
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", move);

    return () => {
      window.removeEventListener("keydown", move);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function Game() {
  //const initialTiles = [
  //[0, 0, 0, 2],
  //[0, 0, 0, 2],
  //[0, 0, 0, 2],
  //[0, 0, 0, 2],
  //];

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

//function calculateWinner(tiles) {
//const lines = [
//[0, 1, 2],
//[3, 4, 5],
//[6, 7, 8],
//[0, 3, 6],
//[1, 4, 7],
//[2, 5, 8],
//[0, 4, 8],
//[2, 4, 6],
//];
//for (let i = 0; i < lines.length; i++) {
//const [a, b, c] = lines[i];
//if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
//return tiles[a];
//}
//}
//return null;
//}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
