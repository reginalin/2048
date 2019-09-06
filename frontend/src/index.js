import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DIRECTION } from "./constants.js";
import { Board } from "./components/Board.js";

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
	var topScores = window.token; //list of json name, score objects

	const displayScores = () => {
		return (
			<div>
				{ topScores.map(score => 
					<div key={score.id}>
						<p>{score.name}: {score.scoreValue} </p> 
					</div>
				)}
			</div>
		);
	}

  return (
    <div className="game">
      <div className="game-board">
        <Board keyPressed={useKeyPress()} />
      </div>
			<h2>High Scores</h2>
			{ displayScores()}
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
