/**
 * Displays that depend on game status
 * 1. game over and user has won
 * 2. game over and user has lost
 * 3. game not over (game is in session)
 */
import React from 'react';
import Stopwatch from './stopwatch.js';
import { ScoreForm } from './scores.js';
import { useGameState } from '../gameContext.js';

// Game over and user won
const GameWonDisplay = () => {
	let gameTime = useGameState().time;
	return (
		<>
			<p>You won!</p>
			<p>Your time is {gameTime} </p>
		<ScoreForm className='scoreForm' score={gameTime}/>
		</>
	);
}

// Game over and user lost 
const GameLostDisplay = () => {
	return (
		<>
			<p>You lost!</p>
			<p>Try again? </p>
		</>
	);
}

// Game not over 
const GameSessionDisplay = () => {
	return (
		<Stopwatch/>
	);
}

export {
	GameWonDisplay,
	GameLostDisplay,
	GameSessionDisplay
};
