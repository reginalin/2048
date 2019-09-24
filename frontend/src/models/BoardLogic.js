import { DIRECTION } from 'utilities/constants.js';
import { deepCopyNestedArray } from 'utilities/utils.js';

/**
 * Handles logic relating to board updates and tile movements
 */
class BoardLogic {
	/**
	 * @param {!Array<!Array<number>>} startingTiles tiles to begin with
	 * @param {number} dimension of the board
	 */
	constructor(startingTiles, dimension) {
		this._tiles = deepCopyNestedArray(startingTiles);
		this._biggestTile = 0;
		this._numEmptyTiles = dimension * dimension;

		// for game restart
		this._startingTiles = startingTiles;
		this._dimension = dimension;
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

	get startingTiles() {
		return this._startingTiles;
	}

	get dimension() {
		return this._dimension;
	}

	set startingTiles(tilesToSet) {
		this._startingTiles = tilesToSet;
	}

	set dimension(dim) {
		this._dimension = dim;
	}

	/**
	 * Resets board to inital state upon game restart
	 */
	restart() {
		this._tiles = deepCopyNestedArray(this._startingTiles); 
		this._biggestTile = 0;
		this._numEmptyTiles = this.dimension * this.dimension;
	}

	/**
	 * Check if tile num at (row, col) matches (nextRow, nextCol) 
	 */
	sameTileNumber(newTiles, row, col, nextRow, nextCol) {
		return (newTiles[row][col] === newTiles[nextRow][nextCol]);
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
	mergeIntoEmpty(newTiles, row, col, nextRow, nextCol) {
		newTiles[row][col] = newTiles[nextRow][nextCol];
		newTiles[nextRow][nextCol] = 0;
	}

	/**
	 * Sum value from nextRow, nextCol, into row, col 
	 * Side effect: updates biggestTile if new value is larger 
	 */
	mergeSameNumber(newTiles, row, col, nextRow, nextCol) {
		let newVal = newTiles[row][col] + newTiles[nextRow][nextCol];
		newTiles[row][col] = newVal;
		newTiles[nextRow][nextCol] = 0;

		this._numEmptyTiles += 1;

		// check if new value is largest seen so far
		if (newVal > this._biggestTile) {
			this._biggestTile = newVal;
		}
	};

	/**
	 * Handle merging of (nextRow, nextCol) into (row, col)
	 */
	merge(newTiles, row, col, nextRow, nextCol) {
		if (this.emptyTile(newTiles, row, col)) {
			this.mergeIntoEmpty(newTiles, row, col, nextRow, nextCol);
		} else {
			if (this.sameTileNumber(newTiles, row, col, nextRow, nextCol)) {
				this.mergeSameNumber(newTiles, row, col, nextRow, nextCol);
			}
		}
	}

	/*
	 * Each tile shifts or merges up one space if possible
	 */
	shiftUp(newTiles) {
		for (let row = 0; row < this.dimension - 1; row++) {
			for (let col = 0; col < this.dimension; col++) {
				let nextRow = row + 1;
				let nextCol = col;
				this.merge(newTiles, row, col, nextRow, nextCol); 
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
				this.merge(newTiles, row, col, nextRow, nextCol); 
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
				this.merge(newTiles, row, col, nextRow, nextCol); 
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
				this.merge(newTiles, row, col, nextRow, nextCol); 
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
		if (this._biggestTile >= 32) {
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
	 * return random row or col index
	 */
	getRandomIndex() {
		return Math.floor(Math.random() * this.dimension);
	}

	/**
	 * Generates new 2 or 4 in random spot and updates board
	 */
	generateNewNum(newTiles) {
		let row = this.getRandomIndex(this.dimension);
		let col = this.getRandomIndex(this.dimension);
		if (this.emptyTile(newTiles, row, col)) {
			newTiles[row][col] = this.numToGenerate();
			this._numEmptyTiles = this.numEmptyTiles - 1;
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
		let newTiles = [...this.tiles];
		this.shift(newTiles, direction);
		this.generateNewNum(newTiles);
		this._tiles = newTiles;
	}
}

export { BoardLogic };
