import { BoardLogic } from './BoardLogic.js';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './themeContext.js';
import { useGameState, useGameDispatch } from './gameContext.js';
import './style/style.css';

import { 
	dimension,
	winningTile,
	initialTime, 
	initialTiles, 
	GAME_ACTION,
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

//const GameContext = React.createContext();
const TimeContext = React.createContext();
const BoardContext = React.createContext();

const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

const Game = props => {
	// GameContext
  //const [gameOver, setGameOver] = useState(false); 
	//const [gameWon, setGameWon] = useState(false);
	//const [restart, setRestart] = useState(false);
	const { gameOver, gameWon, restart } = useGameState();
	const gameDispatch = useGameDispatch();
	const pressed = props.pressed;

	// TimeContext
	const [gameTime, setGameTime] = useState(startingTiles); 

	const [tiles, setTiles] = useState(startingTiles);

	const [boardLogic, setBoardLogic] = 
		useState(new BoardLogic(initialTiles, dimension));

	/**
	 * Resets context and BoardLogic
	 */
  const restartGame = () => {
		gameDispatch(GAME_ACTION.restart);
		//setGameOver(false);
		//setGameWon(false);	
		boardLogic.restart();
		setBoardLogic(boardLogic);
		setTiles(startingTiles);
		//setRestart(false);
		gameDispatch(GAME_ACTION.restart_over);
	}

	/**
	 * Sets context appropriately if we have won or lost 
	 */
	const checkGameOver = () =>  {

		// lose if board is full before winningTile 
		if (boardLogic.numEmptyTiles === 0) {
			gameDispatch(GAME_ACTION.lost);
			//setGameOver(true);
			//setGameWon(false);
		}

		// win if we get winningTile
		if (boardLogic.biggestTile === winningTile) {
			gameDispatch(GAME_ACTION.won);
			//setGameOver(true);
			//setGameWon(true);
		}
	}

	/**
	 * Handles restart
	 */
	useEffect(() => {
		if (restart) {
			restartGame();
		}
	}, [restart]);

	/**
	 * Handles key press 
	 */
	useEffect(() => {
		if (!gameOver) {
			boardLogic.update(pressed.direction);
			setBoardLogic(boardLogic);
			setTiles(boardLogic.tiles);
			checkGameOver();
		}
	}, [pressed]);

	/**
	 * Display varies depending on whether game is
	 * 1. won
	 * 2. lost
	 * 3. in session
	 */
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

		//<GameContext.Provider 
			//value={{gameOver, 
				//setGameOver, 
				//gameWon, 
				//setGameWon, 
				//restart, 
				//setRestart, 
				//}}>
		//</GameContext.Provider>
  return (
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
						<Board tiles={boardLogic.tiles}/>
					</div>
				</TimeContext.Provider>
			</BoardContext.Provider>
  );
}

export { Game, TimeContext, BoardContext };
