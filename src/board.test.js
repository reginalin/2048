import { merge, slideUp, slideUpWholeBoard, shiftUp, fullShiftUp } from './board.js';

test('simple test', () => {
	expect(1).toBe(1);
});

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

test('shift up, same result', () => {
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
	shiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});

test('shift up, adjacent, beginning rows, same num', () => {
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
	shiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});

test('shift up, end, same num', () => {
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
	shiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});

test('shift up, no shift different num', () => {
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
	shiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});

test('slideUpWholeBoard', () => {
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
	slideUpWholeBoard(tiles);
	expect(tiles).toEqual(newTiles);
});

test('slideUpWholeBoard, no change', () => {
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
	slideUpWholeBoard(tiles);
	expect(tiles).toEqual(newTiles);
});

test('fullShiftUp no merge', () => {
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
	fullShiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});

test('fullShiftUp with merge', () => {
	var tiles = 
		[
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
	fullShiftUp(tiles);
	expect(tiles).toEqual(newTiles);
});
