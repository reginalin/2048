import { DIRECTION } from './constants.js';
import { getRandomIndex } from './utils.js';

class BoardLogic {

	constructor(startingTiles, dimension) {
		this._tiles = startingTiles;
		this._biggestTile = 0;
		this._numEmptyTiles = this.dimension * this.dimension;

		// for restarting game
		this._startingTiles = startingTiles;
		this._dimension = dimension;
	}

	/**
	 * Resets board to inital state upon game restart
	 */
	restart() {
		this.tiles = this.startingTiles;
		this.biggestTile = 0;
		this.numEmptyTiles = this.dimension * this.dimension;
	}

	get tiles() {
		return this._tiles;
	}

	get biggestTile() {
		return this._biggestTile;
	}

	get numEmptyTiles() {
		return this._numEmptyTiles;
	}

	set biggestTile(biggest) {
		this._biggestTile = biggest;
	}

	set numEmptyTiles(numEmpty) {
		this._numEmptyTiles = numEmpty;
	}

	/**
	 * We can merge if tiles match or if merging into a blank
	 */
	canMerge(newTiles, row, col, nextRow, nextCol) {
		return (newTiles[row][col] === newTiles[nextRow][nextCol]);
	}

	/**
	 * Check if we are merging nextRow, nextCol into empty tile
	 */
	mergingIntoEmpty(newTiles, row, col, nextRow, nextCol) {
		return newTiles[row][col] === 0;
	}

	/**
	 * @return {boolean} whether tile at (row, col) is empty
	 */
	emptyTile(newTiles, row, col) {
		return newTiles[row][col] === 0;
	}

	/**
	 * Move value from nextRow, nextCol into row, col
	 * Side effect: updates numEmptyTiles
	 */
	slide(newTiles, row, col, nextRow, nextCol) {
		newTiles[row][col] = newTiles[nextRow][nextCol];
		this.numEmptyTiles += 1;
	}

	/**
	 * Sum value from nextRow, nextCol, into row, col 
	 * Side effect: updates biggestTile if new value is larger 
	 */
	merge(newTiles, row, col, nextRow, nextCol) {
		if (this.canMerge(newTiles, row, col, nextRow, nextCol)) {
			let newVal = newTiles[row][col] + newTiles[nextRow][nextCol];
			newTiles[row][col] = newVal;
			newTiles[nextRow][nextCol] = 0;

			// check if new value is largest seen so far
			if (newVal > this.biggestTile) {
				this.biggestTile(newVal);
			}
		}
	};

	/*
	 * Each tile shifts or merges up one space if possible
	 */
	shiftUp(newTiles) {
		for (let row = 0; row < this.dimension - 1; row++) {
			for (let col = 0; col < this.dimension; col++) {
				let nextRow = row + 1;
				let nextCol = col;
				if (this.emptyTile(newTiles, row, col)) {
					this.slide(newTiles, row, col, nextRow, nextCol);
				} else {
					this.merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts or merges left one space if possible
	 */
	shiftLeft(newTiles) {
		for (let row = 0; row < this.dimension; row++) {
			for (let col = 0; col < this.dimension - 1; col++) {
				let nextRow = row;
				let nextCol = col + 1;
				if (this.emptyTile(newTiles, row, col)) {
					this.slide(newTiles, row, col, nextRow, nextCol);
				} else {
					this.merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts or merges down one if possible
	 */
	shiftDown(newTiles) {
		for (let row = this.dimension - 1; row > 0; row--) {
			for (let col = 0; col < this.dimension; col++) {
				let nextRow = row - 1;
				let nextCol = col;
				if (this.emptyTile(newTiles, row, col)) {
					this.slide(newTiles, row, col, nextRow, nextCol);
				} else {
					this.merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/*
	 * Each tile shifts or merges right one if possible
	 */
	shiftRight(newTiles) {
		for (let row = 0; row < this.dimension; row++) {
			for (let col = this.dimension - 1; col > 0; col--) {
				let nextRow = row;
				let nextCol = col - 1;
				if (this.emptyTile(newTiles, row, col)) {
					this.slide(newTiles, row, col, nextRow, nextCol);
				} else {
					this.merge(newTiles, row, col, nextRow, nextCol);
				}
			}
		}
	};

	/**
	 * Full shift in specified direction
	 */
	shift(newTiles, direction) {
		for (let pass = 0; pass < this.dimension; pass++) {
			switch (direction) {
				case DIRECTION.UP:
					this.shiftUp(newTiles);
					break;
				case DIRECTION.DOWN:
					this.shiftDown(newTiles);
					break;
				case DIRECTION.LEFT:
					this.shiftLeft(newTiles);
					break;
				case DIRECTION.RIGHT:
					this.shiftRight(newTiles);
					break;
				default:
					break;
			}
		}
	}

	/**
	 * Generate 2s or 4s (if tiles are large enough)
	 */
	numToGenerate() {
		if (this.biggestTile >= 32) {
			if (Math.random() > .5) {
				return 4;
			}
		}
		return 2;
	}

	/**
	 * @return {boolean} whether number of empty tiles is 0
	 */
	emptyTilesRemaining() {
		return this.numEmptyTiles !== 0;
	}

	/**
	 * Generates new 2 or 4 in random spot and updates board
	 */
	generateNewNum(newTiles) {
		let row = getRandomIndex(this.dimension);
		let col = getRandomIndex(this.dimension);
		if (this.emptyTile(newTiles, row, col)) {
			newTiles[row][col] = this.numToGenerate();
			this.numEmptyTiles -= 1;
		} else { 
				if (this.emptyTilesRemaining()) {
					this.generateNewNum(newTiles);
				}
		}
	};

	/**
	 * Update board tiles in specified direction
	 * @param {DIRECTION} direction to shift board
	 */
	update(direction) {
		var newTiles = [...this.tiles];
		this.shift(this.tiles, direction);
		this.generateNewNum(this.tiles);
		this.tiles = newTiles;
	}
}

export { BoardLogic };
