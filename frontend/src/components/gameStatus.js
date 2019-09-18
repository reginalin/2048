/**
 * Display components specific to game status 
 * Either: 
 * 1. game is over and user has won
 * 2. game is over and user has lost
 * 3. game is in session
 */
import React, { useContext } from 'react';
import Stopwatch from './stopwatch.js';
import { ScoreForm } from './scores.js';
import { GameContext } from '../game.js'

const GameWonDisplay = () => {
	const gameTime = useContext(GameContext).gameTime; 
	return (
		<>
			<p>You won!</p>
			<p>Your time is {gameTime} </p>
		<ScoreForm className='scoreForm' score={gameTime}/>
		</>
	);
}

const GameLostDisplay = () => {
	return (
		<>
			<p>You lost!</p>
			<p>Try again? </p>
		</>
	);
}

const GameSessionDisplay = () => {
	return (
		<Stopwatch/>
	);
}

export { GameWonDisplay, GameLostDisplay, GameSessionDisplay };
