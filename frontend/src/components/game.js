import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '../themeContext.js';
import { BoardLogic } from '../models/BoardLogic.js';
import { useGameState, useGameDispatch } from '../gameContext.js';
import { 
	dimension,
	winningTile,
	initialTiles, 
	GAME_ACTION,
} from '../utilities/constants.js';
import { Board } from './board.js';
import {
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
} from './buttons.js';
import { 
	GameWonDisplay, 
	GameLostDisplay, 
	GameSessionDisplay,
} from './gameStatus.js';
import '../style/style.css';

/**
 * Component handling game logic
 * Subcomponents of game depend on game context changes made here
 */
const Game = props => {
	Game.propTypes = {
		pressed: PropTypes.object,	
	}
	const pressed = props.pressed;

	// Game context
	const gameDispatch = useGameDispatch();
	const { gameOver, gameWon, restart } = useGameState();

	// class encapsulating board state
	const boardLogic = 
		useState(new BoardLogic(initialTiles, dimension))[0];

	// Handles restart
	useEffect(() => {
		if (restart) {
			boardLogic.restart();
			gameDispatch({ type: GAME_ACTION.restart_over });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps	
	}, [restart]);

	// Handles game state changes upon key press
	useEffect(() => {
	
		// update board logic and game context
		const updateTiles = () => {
			boardLogic.update(pressed.direction);
			gameDispatch({ 
				type: GAME_ACTION.update_tiles,
				value: boardLogic.tiles,
			});
		}

		// update context if game is over
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
	// eslint-disable-next-line react-hooks/exhaustive-deps	
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
