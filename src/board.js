import { dimension } from "./constants.js";

// side effect: modify shifted
// merge if adjacent is the same or current tile empty
export function merge(shifted, row1, col1, row2, col2) {
	let currentVal = shifted[row1][col1];
	let adjacentVal = shifted[row2][col2];
	shifted[row1][col1] = currentVal + adjacentVal; 
	shifted[row2][col2] = 0;
}

// do "sliding all the way" when shift
export function slideUp(shifted, col){
	for (let row = 0; row < dimension - 1; i++) {
		if (shifted[row][col] == 0) {
			let row2 = row + 1;
			while (row2 < dimension && shifted[row2][col] === 0) {
				row2 += 1;
			}
			merge(shifted, row, col, row2, col);
		}	
	}
	return shifted;
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

// return new board with fully shifted tiles
export function fullShiftUp(tiles) {
	var shifted = [...tiles];
	//slide all the way
	for (let col = 0; col < dimension; col++) {
		slideUp(shifted, col);
	}
	// handle shift and merge
	shiftUp(shifted);
	return shifted;
}

export default { merge, slideUp, shiftUp, fullShiftUp };
