import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { Board } from "./components/Board.js";
import GameContext from "./gameContext.js";

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
  //const [gameOver, setGameOver] = useState(false);

  return (
    <div className="game">
      <div className="game-board">
        <Board keyPressed={useKeyPress()} />
      </div>
    </div>
  );
};

//<Board
//keyPressed={useKeyPress()}
//over={(isEnd) => {setGameOver(isEnd) }}
///>
//<GameContext.Provider value={{gameOver: true}}></GameContext.Provider>
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
