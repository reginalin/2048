import { useContext, useEffect, useState } from "react";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { GameContext, BoardContext } from './index.js'
import './style.css'

//const isGameOver = newTiles => {
	//for (let i = 0; i < dimension; i++) {
		//for (let j = 0; j < dimension; j++) {
			//if (newTiles[i][j] === winningTile) {
				//return true;
			//}
		//}
	//}
	//return false;
//};

export const GameLogic = () =>  {
	const { gameOver, setGameOver, pressed } = useContext(GameContext);
	const { tiles, setTiles } = useContext(BoardContext);
	const { biggestTile, setBiggestTile } = useState(0);
	var numEmptyTiles = dimension * dimension; //initially
	
  const updateBoard = () => {
    var direction = pressed.direction;
    if (direction != null) {
      var newTiles = move(tiles, direction);
      setTiles(newTiles);
    }
  };
  useEffect(() => {
    updateBoard();
  }, [pressed]);

	/**
	 * Handle changes when one key is pressed
	 */
	const move = (tiles, direction) => {
		var newTiles = [...tiles];
		updateTiles(newTiles, direction);
		generateNewNum(newTiles);
		return newTiles;
	};

	/**
	 * Update board tiles in specified direction
	 * @param {DIRECTION} direction to shift board
	 */
	const updateTiles = (newTiles, direction) => {
		slide(newTiles, direction);
		shift(newTiles, direction);
		slide(newTiles, direction);
		return newTiles;
	};

	/**
	 * Sum value from nextRow, nextCol, into row, col 
	 * Side effect: if new value formed is winning Tile, set game over
	 */
	const merge = (newTiles, row, col, nextRow, nextCol) => {
		if (row === nextRow && col === nextCol) {
			return;
		}
		let currentVal = newTiles[row][col];
		let adjacentVal = newTiles[nextRow][nextCol];
		let newVal = currentVal + adjacentVal;
		newTiles[row][col] = currentVal + adjacentVal;
		newTiles[nextRow][nextCol] = 0;
		console.log(numEmptyTiles);
		numEmptyTiles++;
		if (newVal > biggestTile) {
			setBiggestTile(newVal);
		}
		if (newVal === winningTile) {
			setGameOver(true);
		}
		return newVal;
	};

	const slide = (newTiles, direction) => {
		for (let col = 0; col < dimension; col++) {
			switch (direction) {
				case DIRECTION.UP:
					slideUp(newTiles, col);
					break;
				case DIRECTION.DOWN:
					slideDown(newTiles, col);
					break;
				case DIRECTION.LEFT:
					slideLeft(newTiles, col);
					break;
				case DIRECTION.RIGHT:
					slideRight(newTiles, col);
					break;
				default: 
					console.log("not a direction");
			}
		}
	};

	// do "sliding all the way" when shift
	const slideUp = (newTiles, col) => {
		//slide incrementally
		for (let row = 0; row < dimension - 1; row++) {
			if (newTiles[row][col] === 0) {
				let nextRow = row + 1;
				//slide next available non blank tile
				while (nextRow < dimension - 1 && newTiles[nextRow][col] === 0) {
					nextRow += 1;
				}
				merge(newTiles, row, col, nextRow, col);
			}
		}
		return newTiles;
	};

	const slideLeft = (newTiles, row) => {
		for (let col = 0; col < dimension - 1; col++) {
			if (newTiles[row][col] === 0) {
				let nextCol = col + 1;
				while (nextCol < dimension - 1 && newTiles[row][nextCol] === 0) {
					nextCol += 1;
				}
				merge(newTiles, row, col, row, nextCol);
			}
		}
		return newTiles;
	};

	const slideDown = (newTiles, col) => {
		for (let row = dimension - 1; row > 0; row--) {
			if (newTiles[row][col] === 0) {
				let nextRow = row - 1;
				while (nextRow > 0 && newTiles[nextRow][col] === 0) {
					nextRow -= 1;
				}
				merge(newTiles, row, col, nextRow, col);
			}
		}
		return newTiles;
	};

	const slideRight = (newTiles, row) => {
		for (let col = dimension - 1; col > 0; col--) {
			if (newTiles[row][col] === 0) {
				let nextCol = col - 1;
				while (nextCol > 0 && newTiles[row][nextCol] === 0) {
					nextCol -= 1;
				}
				merge(newTiles, row, col, row, nextCol);
			}
		}
		return newTiles;
	};


	// modify board with merged tiles newTiles up one
	const shiftUp = newTiles => {
		for (let row = 0; row < dimension - 1; row++) {
			for (let col = 0; col < dimension; col++) {
				let nextRow = row + 1;
				if (newTiles[row][col] === newTiles[nextRow][col]) {
					merge(newTiles, row, col, nextRow, col);
				}
			}
		}
	};

	const shiftLeft = newTiles => {
		for (let row = 0; row < dimension; row++) {
			for (let col = 0; col < dimension - 1; col++) {
				let nextCol = col + 1;
				if (newTiles[row][col] === newTiles[row][nextCol]) {
					merge(newTiles, row, col, row, nextCol);
				}
			}
		}
	};

	const shiftDown = newTiles => {
		for (let row = dimension - 1; row > 0; row--) {
			for (let col = 0; col < dimension; col++) {
				let nextRow = row - 1;
				if (newTiles[row][col] === newTiles[nextRow][col]) {
					merge(newTiles, row, col, nextRow, col);
				}
			}
		}
	};

	const shiftRight = newTiles => {
		for (let row = 0; row < dimension; row++) {
			for (let col = dimension - 1; col > 0; col--) {
				let nextCol = col - 1;
				if (newTiles[row][col] === newTiles[row][nextCol]) {
					merge(newTiles, row, col, row, nextCol);
				}
			}
		}
	};

	const shift = (newTiles, direction) => {
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
			//do nothing
		}
	};

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
			numEmptyTiles--;
		} else {
			if (numEmptyTiles !== 0) {
				console.log(numEmptyTiles);
				generateNewNum(newTiles);
			} else {
				setGameOver(true);
			}
		}
	};

	/**
	 * when we reach a high enough point, generate 4
	 */
	const numToGenerate = () => {
		if (biggestTile >= 64) {
			if (Math.random() > .5) {
				return 4;
			}
		}
		return 2;
	}
	return gameOver; 
}
