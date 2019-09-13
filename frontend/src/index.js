import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
	DIRECTION,
	THEMES,
	initialTime, 
	initialTiles, 
} from './constants.js';
import { Board } from './components/board.js';
import Stopwatch from './components/stopwatch.js';
import { ScoreForm } from './components/displayComponents.js';
import { GameLogic } from './gameLogic.js';
import { ThemeProvider, useThemeState, useThemeDispatch } from './themes.js';
import * as serviceWorker from './serviceWorker'; 
import './style/style.css';

export const GameContext = React.createContext();
export const TimeContext = React.createContext();
export const BoardContext = React.createContext();

const Game = () => {
	// GameContext
  const [gameOver, setGameOver] = useState(false); 
	const [gameWon, setGameWon] = useState(false);
	const pressed = useKeyPress(); 

	// TimeContext
	const [gameTime, setGameTime] = useState(initialTime); 

	//BoardContext
	const [tiles, setTiles] = useState(initialTiles);

  var endTime = null;
	var topScores = window.token; 

	const restart = () => {
		setGameOver(false);
		setGameWon(false);
		console.log(gameWon);
		setTiles(initialTiles);
		console.log(tiles);
		console.log("restart");
	}

	const StartButton = () => {
		return (
			<button onClick={restart}>
			Restart
			</button>
		);
	}

	const displayScores = () => {
		return (
			<div>
				{topScores.map(score => 
					<div key={score.id}>
						<p>{score.name}: {score.scoreValue} </p> 
					</div>
				)}
			</div>
		);
	}

	const renderStatus = () => {
		if (gameOver && gameWon) {
			endTime = gameTime;
			return (
				<>
					<p>You won!</p>
					<p>Your time is {endTime} </p>
					<ScoreForm className='scoreForm' score={endTime}/>
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
				<>
					<TimeContext.Provider value={{ setGameTime }}>
						<Stopwatch/>
					</TimeContext.Provider>
				</>
			);
		}
	};

	const ToggleLightDark = () => {
		let theme = useThemeState().color;
		let dispatch = useThemeDispatch();
		return (
			<button onClick={() => dispatch(theme)}>
				{ theme === THEMES.light ? 'dark mode' : 'light mode' }	
			</button>
		);
	}

	const ToggleNormalUltra = () => {
		let theme = useThemeState().fun;
		let dispatch = useThemeDispatch();
		return (
			<button onClick={() => dispatch(theme)}>
				{ theme === THEMES.normal ? 'ultra mode' : 'normal mode' }	
			</button>
		);
	}

	// Game 
  return (
			<div className='container'>
				<div className='leftContainer'> 
					<div className='header'>
						<h1>2048</h1>
						<div> 
							<p className='subheader'>Merge the tiles to get to</p>
							<b><p className='subheader, highlight'>2048</p></b>
						</div>
					</div>
					<div className='stopwatch'>
						{renderStatus()}
						<ThemeProvider>
							<ToggleLightDark />
							<ToggleNormalUltra/>
						</ThemeProvider>
						<StartButton/>
					</div>
					<div className='gameContainer'>
						<GameContext.Provider value={{ gameOver, setGameOver, gameWon, 
								setGameWon, pressed}}>
							<BoardContext.Provider value = {{ tiles, setTiles }}>
								<GameLogic />
								<Board />
							</BoardContext.Provider>
						</GameContext.Provider>
					</div>
					<div className='footer'>
						<h3>Directions</h3>
						<p>h: left, k: up, j: down, l: right </p>
					</div>
				</div>
				<div className='rightContainer'>
					<div id='scoresHeader'><h2>High Scores</h2></div>
					{displayScores()}
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
