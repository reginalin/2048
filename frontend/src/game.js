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

const Game = props => {
	Game.propTypes = {
		//key press
		pressed: PropTypes.object,	
	}
	const pressed = props.pressed;

	// Game context
	const gameDispatch = useGameDispatch();
	const state = useGameState();
	const { gameOver, gameWon, restart, tiles } = useGameState();

	// js class encapsulating board state
	const [boardLogic, setBoardLogic] = 
		useState(new BoardLogic(initialTiles, dimension));


	// Handles restart
	useEffect(() => {
		if (restart) {
			boardLogic.restart();
			gameDispatch({ type: GAME_ACTION.restart_over });
		}
	}, [restart]);

	// Handles game state changes upon key press
	useEffect(() => {
	
		const updateTiles = () => {
			boardLogic.update(pressed.direction);
			gameDispatch({ 
				type: GAME_ACTION.update_tiles,
				value: boardLogic.tiles,
			});
		}

		const checkGameOver = () =>  {
			if (boardLogic.numEmptyTiles === 0) {
				gameDispatch({ type: GAME_ACTION.lost });
			}
			if (boardLogic.biggestTile === winningTile) {
				gameDispatch({ type: GAME_ACTION.won });
			}
		}

		if (!gameOver) {
			updateTiles();
			checkGameOver();
		}
	}, [pressed]);

	// Display varies depending on whether game is: won, lost, in session
	const renderGameStatus = () => {
		let gameDisplay = 
			gameOver ? 
				gameWon ? <GameWonDisplay /> : <GameLostDisplay /> : 
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
