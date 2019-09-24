/**
 * Handle game context
 */
import React from 'react';
import { 
	GAME_ACTION, 
	initialTiles,
	initialTime,
} from 'utilities/constants.js';

const GameStateContext = React.createContext();
const GameDispatchContext = React.createContext();

/**
 * Handles actions concerning game state
 */
const gameReducer = (state, action) => {
	switch (action.type) {
		case GAME_ACTION.won:
			return { ...state, gameOver: true, gameWon: true};
		case GAME_ACTION.lost:
			return { ...state, gameOver: true, gameWon: false};
		case GAME_ACTION.restart:
			return { ...state, tiles: initialTiles, gameOver: false, gameWon: false, restart: true };
		case GAME_ACTION.restart_over:
			return { ...state, restart: false};
		case GAME_ACTION.update_tiles:
			return { ...state, tiles: action.value }
		case GAME_ACTION.update_time: 
			return { ...state, time: action.value}
		default:
			return { state };
	}
}

/**
 * Custom hook providing GameStateContext
 */
const useGameState = () => {
	const gameContext = React.useContext(GameStateContext);
	if (gameContext === undefined) {
		throw new Error('gameContext must be used within a GameProvider');
	}
	return gameContext;
}

/**
 * Custom hook providing GameDispatchContext
 */
const useGameDispatch = () => {
	const gameContext = React.useContext(GameDispatchContext);
	if (gameContext === undefined) {
		throw new Error('themeContext must be used within a GameProvider');
	}
	return gameContext;
}

/**
 * Context provider for game context 
 * Gives game context state and dispatch function to alter state
 */
const GameProvider = ({children}) => {
	const [state, dispatch] = 
		React.useReducer(gameReducer, {
			gameOver: false, 
			gameWon: false, 
			restart: false,
			tiles: initialTiles,
			time: initialTime,
		});

	return (
		<GameStateContext.Provider value={state}>
			<GameDispatchContext.Provider value={dispatch}>
				{children}
			</GameDispatchContext.Provider>
		</GameStateContext.Provider>
	);
}

export {GameProvider, useGameState, useGameDispatch};
