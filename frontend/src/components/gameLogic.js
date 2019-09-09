import React, { useState, useEffect } from "react";
import { dimension, DIRECTION, winningTile } from "./constants.js";
import { GameContext, BoardContext } from './index.js'
import './style.css'

/**
 * Component that handles game logic
 * updates context of Game when given user input
 * @return {boolean} gameOver
 */
const GameLogic = () =>  {
	const { gameOver, setGameOver, pressed } = useContext(GameContext);
	const { tiles, setTiles } = useContext(BoardContext);
	var direction = null;
	
  const updateGame = () => {
    direction = pressed.direction;
		// if valid key pressed
    if (direction != null) {
      var newTiles = move(tiles);
      setTiles(newTiles);
    }
  };

  useEffect(() => {
    updateGame();
  }, [pressed]);

	/**
	 * Handle changes when one key is pressed
	 */
	export const move = () => {
		var newTiles = [...tiles];
		updateTiles(newTiles);
		generateNewNum(newTiles);
		return newTiles;
	};

	/**
	 * Update board tiles in specified direction
	 */
	export const updateTiles = (newTiles) => {
		slide(newTiles);
		shift(newTiles);
		slide(newTiles); // eliminate new empty spaces after shift
	};

	/**
	 * Slide tiles, fill empty spaces in specified direction 
	 */
	export const slide = (newTiles) => {
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
				default: // do nothing
					console.log("not a direction");
			}
		}
	};

	/**
	 * Move tiles if they can be merged
	 */
	export const shift = (newTiles) => {
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
	 * Merge value of nextRow, nextCol, into row, col
	 * Side effect: if new value formed is winning Tile, set game over
	 */
	export const merge = (newTiles, row, col, nextRow, nextCol) => {
		let currentVal = newTiles[row][col];
		let adjacentVal = newTiles[nextRow][nextCol];
		let newVal = currentVal + adjacentVal;
		newTiles[row][col] = currentVal + adjacentVal;
		newTiles[nextRow][nextCol] = 0;
		if (newVal === winningTile) {
			setGameOver(true);
		}
	};


	export const slideUp = (newTiles, col) => {
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
	};

	export const slideDown = (newTiles, col) => {
		for (let row = dimension - 1; row > 0; row--) {
			if (newTiles[row][col] === 0) {
				let nextRow = row - 1;
				while (nextRow > 0 && newTiles[nextRow][col] === 0) {
					nextRow -= 1;
				}
				merge(newTiles, row, col, nextRow, col);
			}
		}
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

	/** 
	 * return random row or col index
	 */
	const getRandomIndex = () => {
		return Math.floor(Math.random() * dimension);
	};

	/**
	 * Generates new num in random spot and updates board
	 */
	const generateNewNum = newTiles => {
		let row = getRandomIndex();
		let col = getRandomIndex();
		if (newTiles[row][col] === 0) {
			newTiles[row][col] = 2;
		} else {
			generateNewNum(newTiles);
		}
	};
}
