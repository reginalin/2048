import { useContext, useEffect, useState } from "react";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { GameContext, BoardContext } from './index.js'

/**
 * Contains main game logic and state
 */
export const GameLogic = () =>  {
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

	useEffect(() => {
		if (restart) {
			restartGame();
		}
	}, [restart]);
	
  useEffect(() => {
		if (!gameOver) {
			move();
		}
  }, [pressed]);

	useEffect(() => {
		checkGameOver();	
	}, [biggestTile, numEmptyTiles]);
	
	/**
	 * Handle board updates in one move
	 */
  const move = () => {
    var direction = pressed.direction;
    if (direction != null) {
      var newTiles = updateTiles(tiles, direction);
      setTiles(newTiles);
    }
  };

	/**
	 * Sets context appropriately if we have won or lost 
	 */
	const checkGameOver = () =>  {
		if (numEmptyTiles === 0) {
			setGameOver(true);
			setGameWon(false);
		}
		if (biggestTile === winningTile) {
			setGameOver(true);
			setGameWon(true);
		}
	}

	/**
	 * Update board tiles in specified direction
	 * @param {DIRECTION} direction to shift board
	 */
	const updateTiles = (tiles, direction) => {
		var newTiles = [...tiles];
		shift(newTiles, direction);
		generateNewNum(newTiles);
		return newTiles;
	};

	/**
	 * Full shift in specified direction
	 */
	const shift = (newTiles, direction) => {
		for (let pass = 0; pass < dimension; pass++) {
			switch (direction) {
				case DIRECTION.UP:
					shiftUp(newTiles);
					break;
				case DIRECTION.DOWN:
					shiftDown(newTiles);
					break;
				case DIRECTION.LEFT:
					shiftLeft(newTiles);
					break;
				case DIRECTION.RIGHT:
					shiftRight(newTiles);
					break;
				default:
					console.log("not a direction");
			}
		}
	};

	/*
	 * Each tile shifts up one space if possible
	 */
	const shiftUp = newTiles => {
		for (let row = 0; row < dimension - 1; row++) {
			for (let col = 0; col < dimension; col++) {
				let nextRow = row + 1;
				let nextCol = col;
				if (canMerge(newTiles, row, col, nextRow, nextCol)) {
					merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts left one if possible
	 */
	const shiftLeft = newTiles => {
		for (let row = 0; row < dimension; row++) {
			for (let col = 0; col < dimension - 1; col++) {
				let nextRow = row;
				let nextCol = col + 1;
				if (canMerge(newTiles, row, col, nextRow, nextCol)) {
					merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts down one if possible
	 */
	const shiftDown = newTiles => {
		for (let row = dimension - 1; row > 0; row--) {
			for (let col = 0; col < dimension; col++) {
				let nextRow = row - 1;
				let nextCol = col;
				if (canMerge(newTiles, row, col, nextRow, nextCol)) {
					merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts right one if possible
	 */
	const shiftRight = newTiles => {
		for (let row = 0; row < dimension; row++) {
			for (let col = dimension - 1; col > 0; col--) {
				let nextRow = row;
				let nextCol = col - 1;
				if (canMerge(newTiles, row, col, nextRow, nextCol)) {
					merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};


	/**
	 * Sum value from nextRow, nextCol, into row, col 
	 * Side effect: updates biggestTile if appropriate 
	 */
	const merge = (newTiles, row, col, nextRow, nextCol) => {
		if (newTiles[row][col] !== 0) { //not merging into empty
			setNumEmptyTiles(numEmptyTiles => numEmptyTiles + 1);
		}
		let newVal = newTiles[row][col] + newTiles[nextRow][nextCol];
		newTiles[row][col] = newVal;
		newTiles[nextRow][nextCol] = 0;
		if (newVal > biggestTile) {
			setBiggestTile(newVal);
		}
		return newVal;
	};

	/**
	 * We can merge if tiles match or if merging into a blank
	 */
	const canMerge = (newTiles, row, col, nextRow, nextCol) => {
		return (newTiles[row][col] === newTiles[nextRow][nextCol] ||
						newTiles[row][col] === 0);
	}

	/** 
	 * return random row or col index
	 */
	const getRandomIndex = () => {
		return Math.floor(Math.random() * dimension);
	};

	/**
	 * Generates new 2 or 4 in random spot and updates board
	 */
	const generateNewNum = newTiles => {
		let row = getRandomIndex();
		let col = getRandomIndex();
		if (newTiles[row][col] === 0) {
			newTiles[row][col] = numToGenerate();
			setNumEmptyTiles(numEmptyTiles => numEmptyTiles - 1);
		} else { 
				if (numEmptyTiles !== 0) {
				generateNewNum(newTiles);
			} 
		}
	};

	/**
	 * Generate 2s or 4s (if tiles are large enough)
	 */
	const numToGenerate = () => {
		if (biggestTile >= 32) {
			if (Math.random() > .5) {
				return 4;
			}
		}
		return 2;
	}
	return gameWon; 
}
