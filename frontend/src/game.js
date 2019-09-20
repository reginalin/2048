import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from './themeContext.js';
import { BoardLogic } from './BoardLogic.js';
import { useGameState, useGameDispatch } from './gameContext.js';
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
import './style/style.css';

const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

const Game = props => {
	Game.propTypes = {
		//key press
		pressed: PropTypes.object,	
	}
	const pressed = props.pressed;

	// Game context
	const gameDispatch = useGameDispatch();
	const state = useGameState();
	console.log(state);
	//const { gameOver, gameWon, restart, tiles, time } = useGameState();
	//console.log(`${restart}`);

	// js class encapsulating board state
	const [boardLogic, setBoardLogic] = 
		useState(new BoardLogic(initialTiles, dimension));

	// Sets context appropriately if we have won or lost 
	const checkGameOver = () =>  {
		if (boardLogic.numEmptyTiles === 0) {
			gameDispatch({ type: GAME_ACTION.lost });
		}
		if (boardLogic.biggestTile === winningTile) {
			gameDispatch({ type: GAME_ACTION.won });
		}
	}

	// Update game context with newTiles
	const updateTiles = newTiles => {
		gameDispatch({ 
			type: GAME_ACTION.update_tiles,
			value: [...newTiles],
		});
	}

	//Resets context and BoardLogic
  const restartGame = () => {
		console.log('restarting');
		boardLogic.restart();
		console.log('restarted bl');
		setBoardLogic(boardLogic);
		console.log('set bl');
		console.log(boardLogic.tiles)

		updateTiles(startingTiles);
		gameDispatch({ type: GAME_ACTION.restart_over });
	}

	// Handles restart
	useEffect(() => {
		if (state.restart) {
			console.log('restart effect');
			restartGame();
		}
	}, [state.restart]);

	// Handles board and game context updates upon key press
	useEffect(() => {
		if (!state.gameOver) {
			boardLogic.update(pressed.direction);
			setBoardLogic(boardLogic);

			updateTiles(boardLogic.tiles);
			checkGameOver();
		}
	}, [pressed]);

	// Display varies depending on whether game is 
	// won, lost, in session
	const renderGameStatus = () => {
		let gameDisplay = 
			state.gameOver ? 
				state.gameWon ? <GameWonDisplay /> : <GameLostDisplay /> : 
			<GameSessionDisplay />;
		return gameDisplay;
	};

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
