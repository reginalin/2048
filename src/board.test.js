import { dimension, DIRECTION } from "./constants.js";

import { 
	merge, 
	slideUp, 
	slideDown,
	slideWholeBoard,
	fullMerge,
	fullShift
} from './board.js';

test('simple test', () => {
	expect(1).toBe(1);
});

test('directions enum', () => {
	expect('up').toBe(DIRECTION.UP);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// merge TESTS

test('merge both empty', () => {
	var tiles = 
		[ 
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	merge(tiles, 0, 0, 0, 1);
	expect(tiles).toEqual(newTiles);
});

test('merge into empty', () => {
	var tiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	merge(tiles, 0 , 2, 1, 2);
	expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// slideUp TESTS 

test('slideUp, no change nonzero col', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, no change zero col', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 1);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, no change multiple items in row', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, one space to end', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, from center', () => {
	var tiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, two in center', () => {
	var tiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, from end', () => {
	var tiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideUp, two at end', () => {
	var tiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideUp(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
// shiftDown TESTS

test('slideDown, no change nonzero col', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, no change zero col', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideDown(tiles, 1);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, no change multiple items in row', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, one space to end', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, from center', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, two in center', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, from end', () => {
	var tiles = 
		[
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 2],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

test('slideDown, two at end', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
		];
	slideDown(tiles, 2);
	expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fullMerge TESTS

test('fullMerge up, same result', () => {
	var tiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 0, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	fullMerge(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});

test('fullMerge up, adjacent, beginning rows, same num', () => {
	let tiles = 
		[
			[0, 0, 2, 2],
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	let newTiles = 
		[
			[0, 0, 4, 2],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	fullMerge(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});

test('fullMerge up, end, same num', () => {
	let tiles = 
		[
			[0, 2, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[0, 0, 2, 0],
		];
	let newTiles = 
		[
			[0, 2, 0, 2],
			[0, 0, 0, 0],
			[0, 0, 4, 0],
			[0, 0, 0, 0],
		];
	fullMerge(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});

test('fullMerge up, no shift different num', () => {
	let tiles = 
		[
			[0, 2, 4, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	let newTiles = 
		[
			[0, 2, 4, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	fullMerge(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// slideWholeBoard TESTS

test('slideWholeBoard, no change', () => {
	var tiles = 
		[
			[0, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideWholeBoard(tiles, ''); 
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard up', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[2, 2, 2, 2],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideWholeBoard(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard, up no change', () => {
	var tiles = 
		[
			[0, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var newTiles = 
		[
			[0, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	slideWholeBoard(tiles, DIRECTION.UP); 
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard up full board', () => {
	var tiles = 
		[
			[2, 2, 2, 2],
			[2, 2, 2, 2],
			[2, 2, 2, 2],
			[2, 2, 2, 2],
		];
	var newTiles = 
		[
			[2, 2, 2, 2],
			[2, 2, 2, 2],
			[2, 2, 2, 2],
			[2, 2, 2, 2],
		];
	slideWholeBoard(tiles, DIRECTION.UP);
	expect(tiles).toEqual(newTiles);
});
test('slideWholeBoard down', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[2, 2, 2, 2],
		];
	slideWholeBoard(tiles, DIRECTION.DOWN);
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard down no change', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[2, 2, 2, 2],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 2, 0],
			[2, 2, 2, 2],
		];
	slideWholeBoard(tiles, DIRECTION.DOWN);
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard left', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[2, 2, 0, 0],
			[2, 2, 0, 0],
			[2, 0, 0, 0],
		];
	slideWholeBoard(tiles, DIRECTION.LEFT);
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard right', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 2],
			[0, 0, 2, 2],
			[0, 0, 0, 2],
		];
	slideWholeBoard(tiles, DIRECTION.RIGHT);
	expect(tiles).toEqual(newTiles);
});

test('slideWholeBoard left right', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 2, 2],
			[0, 0, 2, 2],
			[0, 0, 0, 2],
		];
	slideWholeBoard(tiles, DIRECTION.LEFT);
	slideWholeBoard(tiles, DIRECTION.RIGHT); 
	expect(tiles).toEqual(newTiles);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// fullShift TESTS 

test('fullShift up no merge', () => {
	var tiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 2, 2, 0],
			[2, 0, 0, 0],
		];
	var newTiles = 
		[
			[2, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var modified = fullShift(tiles, DIRECTION.UP); 
	expect(modified).toEqual(newTiles);
});

test('fullShift Up with merge', () => {
	var tiles = [
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 2, 4, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		];
	var modified = fullShift(tiles, DIRECTION.UP);
	expect(modified).toEqual(newTiles);
});

test('fullShift left with merge', () => {
	var tiles = [
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[2, 0, 0, 0],
			[4, 0, 0, 0],
			[2, 0, 0, 0],
		];
	var modified = fullShift(tiles, DIRECTION.LEFT); 
	expect(modified).toEqual(newTiles);
});

test('fullShift down with merge', () => {
	var tiles = [
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 2, 4, 2],
		];
	var modified = fullShift(tiles, DIRECTION.DOWN);
	expect(modified).toEqual(newTiles);
});

test('fullShift right with merge', () => {
	var tiles = [
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 2, 2, 0],
			[0, 0, 2, 0],
		];
	var newTiles = 
		[
			[0, 0, 0, 0],
			[0, 0, 0, 2],
			[0, 0, 0, 4],
			[0, 0, 0, 2],
		];
	var modified = fullShift(tiles, DIRECTION.RIGHT);
	expect(modified).toEqual(newTiles);
});
