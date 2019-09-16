import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { 
	DIRECTION,
	initialTime, 
	initialTiles, 
	getScoresRoute,
} from './constants.js';
import { Board } from './components/board.js';
import Stopwatch from './components/stopwatch.js';
import { 
	ScoreForm,
	TopScoresDisplay, 
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
} from './components/displayComponents.js';
import { GameLogic } from './gameLogic.js';
import { ThemeProvider } from './themes.js';
import * as serviceWorker from './serviceWorker'; 
import './style/style.css';

export const GameContext = React.createContext();
export const TimeContext = React.createContext();
export const BoardContext = React.createContext();

const Game = () => {

	// GameContext
  const [gameOver, setGameOver] = useState(false); 
	const [gameWon, setGameWon] = useState(false);
	const [restart, setRestart] = useState(false);
	const pressed = useKeyPress(); 

	// TimeContext
	const [gameTime, setGameTime] = useState(initialTime); 

	// BoardContext
	const [tiles, setTiles] = useState(initialTiles);

	// Top scores
	const [topScores, setTopScores] = useState([])

	/**
	 * Get scores from flask backend 
	 */
	const getTopScores = async () => {
		await axios.get(getScoresRoute)
			.then(json => {
					console.log(json.data.scores);
					setTopScores(json.data.scores);
			}).catch((e) => {console.log('cant access high scores', e)});
	}
	getTopScores();

	/**
	 * Show display for 
	 * game over, game lost, or game in session
	 */
	const renderStatus = () => {
		if (gameOver && gameWon) {
			return (
				<>
					<p>You won!</p>
					<p>Your time is {gameTime} </p>
				<ScoreForm className='scoreForm' score={gameTime}/>
				</>
			);
		} else if (gameOver && !gameWon) {
			return (
				<>
					<p>You lost!</p>
					<p>Try again? </p>
				</>
			);
		} else {
			return (
						<Stopwatch/>
			);
		}
	};


	// Game 
  return (
			<div className='container'>
				<div className='leftContainer'> 
					<div className='header'>
						<h1>2048</h1>
						<div> 
							<p className='subheader'>Merge the tiles to get to 2048!</p>
						</div>
					</div>
					<GameContext.Provider value={{ gameOver, setGameOver, gameWon, 
							setGameWon, restart, setRestart, pressed}}>
						<BoardContext.Provider value = {{ tiles, setTiles }}>
							<TimeContext.Provider value={{ setGameTime }}>
							<div className='rightHeader'>
								<ThemeProvider>
									<div className='toggles'>
										<ToggleLightDark />
										<ToggleNormalUltra/>
									</div>
									{renderStatus()}
									<StartButton/>
								</ThemeProvider>
							</div>
							<div className='gameContainer'>
										<GameLogic />
										<Board />
							</div>
							</TimeContext.Provider>
						</BoardContext.Provider>
					</GameContext.Provider>
					<div className='footer'>
						<h3>Directions</h3>
							<p>Use vim keys (h: left, k: up, j: down, l: right)</p>
								<p>Try to move fast without 
									filling up the board!</p>
					</div>
				</div>
				<div className='rightContainer'>
					<div id='scoresHeader'>
						<h2>High Scores</h2>
							<TopScoresDisplay scores={topScores}/>
					</div>
				</div>
			</div>
  );
};

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

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
serviceWorker.unregister()
