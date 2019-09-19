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

//const TimeContext = React.createContext();
//const BoardContext = React.createContext();

const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

const Game = props => {
	const { gameOver, gameWon, restart, tiles, time } = useGameState();
	const gameDispatch = useGameDispatch();
	const pressed = props.pressed;
// TimeContext
	//const [gameTime, setGameTime] = useState(initialTime); 

	//const [tiles, setTiles] = useState(startingTiles);

	const [boardLogic, setBoardLogic] = 
		useState(new BoardLogic(initialTiles, dimension));


	/**
	 * Sets context appropriately if we have won or lost 
	 */
	const checkGameOver = () =>  {
		// lose if board is full before winningTile 
		if (boardLogic.numEmptyTiles === 0) {
			gameDispatch({ type: GAME_ACTION.lost });
		}
		// win if we get winningTile
		if (boardLogic.biggestTile === winningTile) {
			console.log('detected in game');
			gameDispatch({ type: GAME_ACTION.won });
		}
	}

	const updateTiles = newTiles => {
		gameDispatch({ 
			type: GAME_ACTION.update_tiles,
			value: newTiles,
		});
	}
	/**
	 * Resets context and BoardLogic
	 */
  const restartGame = () => {
		boardLogic.restart();
		setBoardLogic(boardLogic);

		// reset tiles
		updateTiles(startingTiles);
		//gameDispatch({ 
			//type: GAME_ACTION.update_tiles,
			//value: startingTiles,
		//});

		//setTiles(startingTiles);
		gameDispatch({ type: GAME_ACTION.restart_over });
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

			//setTiles(boardLogic.tiles);
			updateTiles(boardLogic.tiles);
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

		//<TimeContext.Provider value={{ gameTime, setGameTime }}>
				//</TimeContext.Provider>
			//<BoardContext.Provider value = {{ tiles, setTiles }}>
			//</BoardContext.Provider>
  return (
		<>
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
		</>
  );
}

export { Game };