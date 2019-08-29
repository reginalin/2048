import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { updateTiles, gameOver } from "./board.js";
import { Stopwatch } from "./stopwatch.js";

function startButton() {
  return <button className="startButton"></button>;
}

function GameEndStatus() {
  return <p>You won!</p>;
}

// props value is whether game is over
function StatusBar(props) {
  const gameEnd = props.gameEnd;
  if (gameEnd) {
    return <GameEndStatus />;
  }
  return <Stopwatch />;
}

//replaces board
function GameEndDisplay() {
  return <p> whooo </p>;
}

function Tile(props) {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board() {
  let initialTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var [tiles, setTiles] = useState(initialTiles);
  var [gameEnd, setGameEnd] = useState(false);
  const pressed = useKeyPress();

  function renderTile(i, j) {
    return <Tile value={tiles[i][j]} />;
  }
  function renderStatus() {
    return <StatusBar gameEnd={gameEnd} />;
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
  function renderDisplay() {
    if (gameEnd) {
      return <GameEndDisplay />;
    }
    return (
      <div>
        {renderRow(0)}
        {renderRow(1)}
        {renderRow(2)}
        {renderRow(3)}
      </div>
    );
  }
  function updateBoard() {
    var direction = pressed.direction;
    if (direction != null) {
      // if valid key pressed
      var newTiles = updateTiles(tiles, direction);
      setTiles(newTiles);
      setGameEnd(gameOver(tiles));
    }
  }
  useEffect(() => {
    updateBoard();
  }, [pressed]);

  return (
    <div>
      {renderStatus()}
      {renderDisplay()}
    </div>
  );
}

// key press handler using vim keys
function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState({ direction: null });

  function downHandler({ key }) {
    let pressed = null;
    switch (key) {
      case "k":
        pressed = DIRECTION.UP;
        break;
      case "j":
        pressed = DIRECTION.DOWN;
        break;
      case "h":
        pressed = DIRECTION.LEFT;
        break;
      case "l":
        pressed = DIRECTION.RIGHT;
        break;
      default:
        pressed = null;
        break;
    }
    setKeyPressed({ direction: pressed });
    console.log(`pressed ${pressed}`);
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

function Game() {
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
