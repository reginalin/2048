import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { updateTiles, gameOver } from "./board.js";
import { Stopwatch } from "./Stopwatch.js";

const startButton = () => {
  return <button className="startButton"></button>;
};

const GameEndStatus = () => {
  return <p>You won!</p>;
};

// props value is whether game is over
const StatusBar = props => {
  const gameEnd = props.gameEnd;
  if (gameEnd) {
    return <GameEndStatus />;
  }
  return <Stopwatch />;
};

//replaces board
const GameEndDisplay = () => {
  return <p> whooo </p>;
};

const Tile = props => {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = () => {
  let initialTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var [tiles, setTiles] = useState(initialTiles);
  var [gameEnd, setGameEnd] = useState(false);
  const pressed = useKeyPress();

  const renderTile = (i, j) => {
    return <Tile value={tiles[i][j]} />;
  };
  const renderStatus = () => {
    return <StatusBar gameEnd={gameEnd} />;
  };
  const renderRow = i => {
    return (
      <div className="board-row">
        {renderTile(i, 0)}
        {renderTile(i, 1)}
        {renderTile(i, 2)}
        {renderTile(i, 3)}
      </div>
    );
  };
  const renderDisplay = () => {
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
  };
  const updateBoard = () => {
    var direction = pressed.direction;
    if (direction != null) {
      // if valid key pressed
      var newTiles = updateTiles(tiles, direction);
      setTiles(newTiles);
      setGameEnd(gameOver(tiles));
    }
  };
  useEffect(() => {
    updateBoard();
  }, [pressed]);

  return (
    <div>
      {renderStatus()}
      {renderDisplay()}
    </div>
  );
};

// key press handler using vim keys
const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState({ direction: null });

  const downHandler = ({ key }) => {
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
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
