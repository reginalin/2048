import { BoardLogic } from './BoardLogic.js';
import { useContext, useEffect, useState } from "react";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { GameContext, BoardContext } from './game.js'
import { getRandomIndex } from './utils.js';

const NewGameLogic = () => {
	const { 
		gameOver, 
		setGameOver, 
		gameWon, 
		setGameWon, 
		restart,
		setRestart,
		pressed 
	} = useContext(GameContext);
	const { tiles, setTiles } = useContext(BoardContext);
	const [ biggestTile, setBiggestTile ] = useState(0);
	const [ numEmptyTiles, setNumEmptyTiles ] = useState(dimension * dimension);

	const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
  const restartGame = () => {
		setBiggestTile(0);
		setNumEmptyTiles(dimension * dimension);
		setGameOver(false);
		setGameWon(false);	
		setTiles(startingTiles);
		console.log(tiles);
		setRestart(false);
	}

	// divide old and new

	let boardLogic = new BoardLogic(startingTiles, dimension);

	/**
	 * Sets context appropriately if we have won or lost 
	 */
	const checkGameOver = () =>  {
		if (boardLogic.numEmptyTiles() === 0) {
			setGameOver(true);
			setGameWon(false);
		}
		if (boardLogic.getBiggestTile() === winningTile) {
			setGameOver(true);
			setGameWon(true);
		}
	}

	useEffect(() => {
		if (!gameOver) {
			console.log("pressed");
			boardLogic.update(pressed);
			//setTiles(boardLogic.getTiles());
		}
	}, [pressed]);

	//useEffect(() => {
		//if (restart) {
			//boardLogic.restart();
			//restartGame();
		//}
	//}, [restart]);

  //useEffect(() => {
		//if (!gameOver) {
			////boardLogic.update(pressed);
			////setTiles(boardLogic.getTiles());
		//}
  //}, [pressed]);

	//useEffect(() => {
		//checkGameOver();	
	//}, [biggestTile, numEmptyTiles]);

	return gameOver;
}

export { NewGameLogic };
