import React, { useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { dimension, DIRECTION, winningTile } from "../constants.js";
//import ScoreForm from "./scoreForm.js";
import { GameContext, BoardContext } from '../index.js'
import '../style.css'

const Tile = props => {
	Tile.propTypes = {
		value: PropTypes.number,
	}
  return (
    <button className="tile">
      {props.value}
    </button>
  );
};

const Board = () => {
	Board.propTypes = {
		keyPressed: DIRECTION.isRequired,
	}
	Board.defaultProps = {
		keyPressed: DIRECTION.UP,
	}

	const { gameOver, setGameOver, pressed } = useContext(GameContext);
	const {tiles, setTiles} = useContext(BoardContext);

  //const pressed = props.keyPressed;
	
  const updateBoard = () => {
    var direction = pressed.direction;
    if (direction != null) {
      // if valid key pressed
      var newTiles = move(tiles, direction);
      setTiles(newTiles);
			if (isGameOver(tiles)) {
				setGameOver(true);
			}
    }
  };
  useEffect(() => {
    updateBoard();
  }, [pressed]);

///////////////////////////////////////////////////////////////////////////////	
	//Handle RENDERING
///////////////////////////////////////////////////////////////////////////////	
  const renderTile = (i, j) => {
    return <Tile value={tiles[i][j]} />;
  };
	const renderRow = i => {
		return (
			<div className="board-row">
				{renderTile(i, 0)}
				{renderTile(i, 1)}
				{renderTile(i, 2)}
				{renderTile(i, 3)}
			</div>
		);
	};
  const renderBoardDisplay = () => {
    if (gameOver) {
      return (
        <div>
					<p>Whoo!</p>
        </div>
      );
    }
    return (
      <div>
        {renderRow(0)}
        {renderRow(1)}
        {renderRow(2)}
        {renderRow(3)}
      </div>
    );
  };

  return (
    <div>
      {renderBoardDisplay()}
    </div>
  );
};

	// get rid of this later
	const isGameOver = newTiles => {
		for (let i = 0; i < dimension; i++) {
			for (let j = 0; j < dimension; j++) {
				if (newTiles[i][j] === winningTile) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Merge new from row2, col2, into row1, col1
	 * @param {number} row1 row in which new total resides 
	 * @param {number} col1 col in which new total resides
	 * @param {number} row2 row to be cleared upon merge
	 * @param {number} col2 col to be cleared upon merge
	 */
	const merge = (newTiles, row1, col1, row2, col2) => {
		let currentVal = newTiles[row1][col1];
		let adjacentVal = newTiles[row2][col2];
		newTiles[row1][col1] = currentVal + adjacentVal;
		newTiles[row2][col2] = 0;
	};

	// do "sliding all the way" when shift
	const slideUp = (newTiles, col) => {
		//slide incrementally
		for (let row = 0; row < dimension - 1; row++) {
			if (newTiles[row][col] === 0) {
				let row2 = row + 1;
				//slide next available non blank tile
				while (row2 < dimension - 1 && newTiles[row2][col] === 0) {
					row2 += 1;
				}
				merge(newTiles, row, col, row2, col);
			}
		}
		return newTiles;
	};

	const slideLeft = (newTiles, row) => {
		for (let col = 0; col < dimension - 1; col++) {
			if (newTiles[row][col] === 0) {
				let col2 = col + 1;
				while (col2 < dimension - 1 && newTiles[row][col2] === 0) {
					col2 += 1;
				}
				merge(newTiles, row, col, row, col2);
			}
		}
		return newTiles;
	};

	const slideDown = (newTiles, col) => {
		for (let row = dimension - 1; row > 0; row--) {
			if (newTiles[row][col] === 0) {
				let row2 = row - 1;
				while (row2 > 0 && newTiles[row2][col] === 0) {
					row2 -= 1;
				}
				merge(newTiles, row, col, row2, col);
			}
		}
		return newTiles;
	};

	const slideRight = (newTiles, row) => {
		for (let col = dimension - 1; col > 0; col--) {
			if (newTiles[row][col] === 0) {
				let col2 = col - 1;
				while (col2 > 0 && newTiles[row][col2] === 0) {
					col2 -= 1;
				}
				merge(newTiles, row, col, row, col2);
			}
		}
		return newTiles;
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
				default: // do nothing
					console.log("not a direction");
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
	 * Handle changes when one key is pressed
	 */
	const move = (tiles, direction) => {
		var newTiles = [...tiles];
		updateTiles(newTiles, direction);
		generateNewNum(newTiles);
		return newTiles;
	};

export {
  Board,
  merge,
  slideUp,
  slideDown,
  slide,
  shift,
  updateTiles,
  move
};
