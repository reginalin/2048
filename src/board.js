import { dimension, DIRECTION} from "./constants.js"; 

// side effect: modify shifted
export function merge(shifted, row1, col1, row2, col2) {
	let currentVal = shifted[row1][col1];
	let adjacentVal = shifted[row2][col2];
	shifted[row1][col1] = currentVal + adjacentVal; 
	shifted[row2][col2] = 0;
}

// do "sliding all the way" when shift
export function slideUp(shifted, col){
	for (let row = 0; row < dimension - 1; row++) {
		if (shifted[row][col] == 0) {
			let row2 = row + 1;
			while (row2 < dimension - 1 && shifted[row2][col] === 0) {
				row2 += 1;
			}
			merge(shifted, row, col, row2, col);
		}	
	}
	return shifted;
}

export function slideLeft(shifted, row) {
	for (let col = 0; col < dimension - 1; col ++) {
		if (shifted[row][col] == 0) {
			let col2 = col + 1;
			while (col2 < dimension - 1 && shifted[row][col2] === 0) {
				col2 += 1;
			}
			merge(shifted, row, col, row, col2);
		}	
	}
	return shifted;
}

// slide down ~ slide right
export function slideDown(shifted, col){
	for (let row = dimension - 1; row > 0; row--) {
		if (shifted[row][col] == 0) {
			let row2 = row - 1;
			while (row2 > 0 && shifted[row2][col] === 0) {
				row2 -= 1;
			}
			merge(shifted, row, col, row2, col);
		}	
	}
	return shifted;
}

export function slideRight(shifted, row){
	for (let col = dimension - 1; col > 0; col--) {
		if (shifted[row][col] == 0) {
			let col2 = col - 1;
			while (col2 > 0 && shifted[row][col2] === 0) {
				col2 -= 1;
			}
			merge(shifted, row, col, row, col2);
		}	
	}
	return shifted;
}

export function slideWholeBoard(shifted, direction) {
	for (let col = 0; col < dimension; col++) {
		switch(direction) {
			case DIRECTION.UP:
				slideUp(shifted, col);		
				break;
			case DIRECTION.DOWN:
				slideDown(shifted, col);
				break;
			case DIRECTION.LEFT:
				slideLeft(shifted, col);
				break;
			case DIRECTION.RIGHT:
				slideRight(shifted, col);
				break;
			default: 
				console.log('not a direction');
				//do nothing
		}
	}
}

// modify board with merged tiles shifted up one
export function shiftUp(shifted) {
	for (let row = 0; row < dimension - 1; row++) {
		for (let col = 0; col < dimension; col++) {
			let nextRow = row + 1;
			if (shifted[row][col] === shifted[nextRow][col]) {
				merge(shifted, row, col, nextRow, col)
			}
		}
	}
}

export function shiftLeft(shifted) {
	for (let col = 0; col < dimension - 1; col++) {
		for (let row = 0; row < dimension; row++) {
			let nextCol = col + 1;
			if (shifted[row][col] === shifted[row][nextCol]) {
				merge(shifted, row, col, row, nextCol)
			}
		}
	}
}

export function shiftDown(shifted) {
	for (let row = dimension - 1; row > 0; row--) {
		for (let col = dimension - 1; col > 0; col--) {
			let nextRow = row - 1;
			if (shifted[row][col] === shifted[nextRow][col]) {
				merge(shifted, row, col, nextRow, col)
			}
		}
	}
}

export function shiftRight(shifted) {
	for (let col = dimension - 1; col > 0; col--) {
		for (let row = dimension - 1; row > 0; row--) {
			let nextCol = col - 1;
			if (shifted[row][col] === shifted[row][nextCol]) {
				merge(shifted, row, col, row, nextCol)
			}
		}
	}
}

export function fullMerge(shifted, direction) {
	switch(direction) {
		case DIRECTION.UP:
			shiftUp(shifted);
			break;
		case DIRECTION.DOWN:
			shiftDown(shifted);
			break;
		case DIRECTION.LEFT:
			shiftLeft(shifted);
			break;
		case DIRECTION.RIGHT:
			shiftRight(shifted);
			break;
		default: 
			console.log('not a direction');
			//do nothing
	}
}

// happens in one board update when key pressed
export function fullShift(tiles, direction) {
	var shifted = [...tiles];
	slideWholeBoard(shifted, direction);
	fullMerge(shifted, direction);
}

export default { 
	merge, 
	slideUp, 
	slideDown, 
	slideWholeBoard, 
	fullMerge,
	fullShift 
};
