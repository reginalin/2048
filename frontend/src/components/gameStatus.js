import React, { useContext } from 'react';
import Stopwatch from './stopwatch.js';
import { ScoreForm } from './scores.js';
import { TimeContext } from '../game.js'
import { useGameState } from '../gameContext.js';

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
