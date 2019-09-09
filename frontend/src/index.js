import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DIRECTION, initialTime, initialTiles } from './constants.js';
import { Board } from './components/board.js';
import Stopwatch from "./components/stopwatch.js";
import ScoreForm from "./components/scoreForm.js";
import './style.css';
import * as serviceWorker from './serviceWorker'; 

// key press handler using vim keys
const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState({ direction: null });

  const downHandler = ({ key }) => {
    let pressed = null;
    switch (key) {
      case 'k':
        pressed = DIRECTION.UP;
        break;
      case 'j':
        pressed = DIRECTION.DOWN;
        break;
      case 'h':
        pressed = DIRECTION.LEFT;
        break;
      case 'l':
        pressed = DIRECTION.RIGHT;
        break;
      default:
        pressed = null;
        break;
    }
    setKeyPressed({ direction: pressed });
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
  return keyPressed;
};

export const GameContext = React.createContext();
export const TimeContext = React.createContext();
export const BoardContext = React.createContext();

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
	const [gameTime, setGameTime] = useState(initialTime); // where time indicates endtime

	const [tiles, setTiles] = useState(initialTiles);
	const pressed = useKeyPress();

  var endTime = null;

	// High scores
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

  const renderStatus = () => {
    if (gameOver) {
      endTime = gameTime;
      return (
				<div>
					<p> You won! Your time is {endTime} </p>
					<ScoreForm score={endTime}/>
				</div>
			);
    }
    return (
			<TimeContext.Provider value={{ setGameTime }}>
				<Stopwatch/>
			</TimeContext.Provider>
    );
  };

	// Game 
  return (
			<>
				<div>
					{renderStatus()}
				</div>
				<div className='game'>
					<GameContext.Provider value={{ gameOver, setGameOver, pressed}}>
						<BoardContext.Provider value = {{ tiles, setTiles }}>
							<Board />
						</BoardContext.Provider>
							{renderStatus}
					</GameContext.Provider>
					<h2>High Scores</h2>
					{ displayScores()}
				</div>
				<div>
					<h3>Directions</h3>
					<p>h: left, k: up, j: down, l: right </p>
				</div>
			</>
  );
};

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
serviceWorker.unregister()
