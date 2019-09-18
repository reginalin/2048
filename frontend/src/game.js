import React, { useState } from 'react';
import { GameLogic } from './gameLogic.js';
import { ThemeProvider } from './themes.js';
import './style/style.css';

import { 
	initialTime, 
	initialTiles, 
} from './constants.js';

import { Board } from './components/board.js';

import {
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
} from './components/buttons.js';

import { 
	GameWonDisplay, 
	GameLostDisplay, 
	GameSessionDisplay,
} from './components/gameStatus.js';

const GameContext = React.createContext();
const TimeContext = React.createContext();
const BoardContext = React.createContext();

const Game = props => {
	// GameContext
  const [gameOver, setGameOver] = useState(false); 
	const [gameWon, setGameWon] = useState(false);
	const [restart, setRestart] = useState(false);
	const pressed = props.pressed; 

	// TimeContext
	const [gameTime, setGameTime] = useState(initialTime); 

	// BoardContext
	const [tiles, setTiles] = useState(initialTiles);

	const renderGameStatus = () => {
		if (gameOver && gameWon) {
			return (
				<GameWonDisplay />
			);
		} else if (gameOver && !gameWon) {
			return (
				<GameLostDisplay />
			);
		} else {
			return (
				<GameSessionDisplay />
			);
		}
	};

  return (
		<GameContext.Provider 
			value={{gameOver, 
				setGameOver, 
				gameWon, 
				setGameWon, 
				restart, 
				setRestart, 
				pressed}}>
			<BoardContext.Provider value = {{ tiles, setTiles }}>
				<TimeContext.Provider value={{ gameTime, setGameTime }}>
					<div className='rightHeader'>
						<ThemeProvider>
							<div className='toggles'>
								<ToggleLightDark />
								<ToggleNormalUltra/>
							</div>
						</ThemeProvider>
						{renderGameStatus()}
						<StartButton/>
					</div>
					<div className='gameContainer'>
						<GameLogic />
						<Board />
					</div>
				</TimeContext.Provider>
			</BoardContext.Provider>
		</GameContext.Provider>
  );
}

export { Game, GameContext, TimeContext, BoardContext };
