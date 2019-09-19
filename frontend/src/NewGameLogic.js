import { BoardLogic } from './BoardLogic.js';
import { useContext, useEffect, useState, useRef } from "react";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { GameContext, BoardContext } from './game.js'
import { getRandomIndex } from './utils.js';

const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
const boardObj = new BoardLogic(startingTiles, dimension);

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

	const [boardLogic, setBoardLogic] = useState(new BoardLogic(startingTiles, dimension));
	//const boardLogic = useRef(boardObj);
	//console.log(boardLogic.tiles);

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
			console.log("pressed" + pressed);
			console.log(boardLogic.tiles);
			boardLogic.update(pressed);
			setBoardLogic(boardLogic);
			setTiles(boardLogic.tiles);
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
