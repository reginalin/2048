import { BoardLogic } from './BoardLogic.js';
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from './themes.js';
import './style/style.css';

import { 
	dimension,
	winningTile,
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

const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

const Game = props => {
	// GameContext
  const [gameOver, setGameOver] = useState(false); 
	const [gameWon, setGameWon] = useState(false);
	const [restart, setRestart] = useState(false);
	const pressed = props.pressed;
	const [boardLogic, setBoardLogic] = useState(new BoardLogic(startingTiles, dimension));
	//console.log(pressed);
	//const pressed = props.pressed; 

	/**
	 * Sets context appropriately if we have won or lost 
	 */
	const checkGameOver = () =>  {
		console.log('checking');
		if (boardLogic.numEmptyTiles === 0) {
			setGameOver(true);
			setGameWon(false);
		}
		if (boardLogic.biggestTile === winningTile) {
			setGameOver(true);
			setGameWon(true);
		}
	}

	useEffect(() => {
		if (!gameOver) {
			boardLogic.update(pressed);
			setBoardLogic(boardLogic);
			setTiles(boardLogic.tiles);
			checkGameOver();
		}
	}, [pressed]);

	// TimeContext
	const [gameTime, setGameTime] = useState(initialTime); 

	// BoardContext
	const [tiles, setTiles] = useState(initialTiles);

	const renderGameStatus = () => {
		if (gameOver && gameWon) {
			return (
				<GameWonDisplay />
			); } else if (gameOver && !gameWon) {
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
						<Board />
					</div>
				</TimeContext.Provider>
			</BoardContext.Provider>
		</GameContext.Provider>
  );
}

export { Game, GameContext, TimeContext, BoardContext };
