import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { dimension, DIRECTION } from "./constants.js";
import { updateTiles } from "./board.js";

// return True if game over
function gameOver() {
  return false;
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
    return <Tile value={tiles[i][j]}/>;
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
		//pressed is the direction
		var direction = pressed[0];
		var newTiles = updateTiles(tiles, direction);
		setTiles(newTiles);	
    console.log(newTiles);
  }
  useEffect(() => {
		updateBoard();
  }, [pressed]);

  return (
    <div>
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
  const [keyPressed, setKeyPressed] = useState([null]);

  function downHandler({ key }) {
    let pressed = "";
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
    setKeyPressed([pressed]);
    console.log(`pressed ${pressed}`);
  }

	function upHandler({ key }) {
		if (key === keyPressed) {
			setKeyPressed("");
			//setKeyPressed(key);
		}
		console.log('lifted key');
	}

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    //window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
			//window.removeEventListener("keyup", upHandler);
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
