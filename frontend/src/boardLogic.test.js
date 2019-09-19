import { dimension, DIRECTION, initialTiles } from "./constants.js";
import { BoardLogic } from "./BoardLogic.js";

test("directions enum", () => {
  expect("up").toBe(DIRECTION.UP);
});

let centerTiles = [
		[0, 0, 0, 0], 
		[0, 2, 0, 0], 
		[0, 0, 2, 0], 
		[0, 0, 0, 0]
	];

let mixed = [
		[2, 0, 0, 0], 
		[0, 2, 0, 2], 
		[0, 2, 2, 0], 
		[2, 0, 0, 0]
	];

let boardLogic = new BoardLogic(initialTiles, 4);
let initialNumEmpty = boardLogic.numEmptyTiles;
let initialBiggest = boardLogic.biggestTile;

beforeEach(() => {
	centerTiles = [
		[0, 0, 0, 0], 
		[0, 2, 0, 0], 
		[0, 0, 2, 0], 
		[0, 0, 0, 0]
	];

	mixed = [
		[2, 0, 0, 0], 
		[0, 2, 0, 2], 
		[0, 2, 2, 0], 
		[2, 0, 0, 0]
	];

	boardLogic = new BoardLogic(initialTiles, 4);
	initialNumEmpty = boardLogic.numEmptyTiles;
	initialBiggest = boardLogic.biggestTile;
});

test("initialize boardLogic", () => {
	const startingTiles = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];
	expect(boardLogic.tiles).toEqual(initialTiles);
	expect(boardLogic.biggestTile).toBe(0);
	expect(boardLogic.numEmptyTiles).toBe(16);
	expect(boardLogic.startingTiles).toEqual(initialTiles);
	expect(boardLogic.dimension).toBe(dimension);
});

// generate new num
test("random index", () => {
	let random = boardLogic.getRandomIndex();
  expect(random).toBeGreaterThanOrEqual(0);
	expect(random).toBeLessThanOrEqual(12);
});

//restart
test("restart", () => {
	boardLogic.restart();
	expect(boardLogic.tiles).toEqual(initialTiles);
	expect(boardLogic.biggestTile).toBe(0);
	expect(boardLogic.numEmptyTiles).toBe(16);
});

test("mergeIntoEmpty", () => {
	let newTiles = [...centerTiles];
	boardLogic.mergeIntoEmpty(newTiles, 0, 1, 1, 1);
	const shifted = [
		[0, 2, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 2, 0], 
		[0, 0, 0, 0]
	];
  expect(newTiles).toEqual(shifted);
	expect(boardLogic.numEmptyTiles).toBe(16);
});

test("mergeSameNumber", () => {
	let newTiles = [...mixed];
	boardLogic.mergeSameNumber(newTiles, 1, 1, 2, 1);
	const newOne = [
		[2, 0, 0, 0], 
		[0, 4, 0, 2], 
		[0, 0, 2, 0], 
		[2, 0, 0, 0]
	];
  expect(newTiles).toEqual(newOne);
	expect(boardLogic.numEmptyTiles).toBe(initialNumEmpty + 1);
	expect(boardLogic.biggestTile).toBe(4);
});

test("full merge empty", () => {
	let newTiles = [...mixed];
	boardLogic.merge(newTiles, 0, 1, 1, 1);
	const newOne = [
		[2, 2, 0, 0], 
		[0, 0, 0, 2], 
		[0, 2, 2, 0], 
		[2, 0, 0, 0]
	];
  expect(newTiles).toEqual(newOne);
	expect(boardLogic.numEmptyTiles).toBe(initialNumEmpty);
});

test("full merge same", () => {
	let newTiles = [...mixed];
	boardLogic.mergeSameNumber(newTiles, 1, 1, 2, 1);
	const newOne = [
		[2, 0, 0, 0], 
		[0, 4, 0, 2], 
		[0, 0, 2, 0], 
		[2, 0, 0, 0]
	];
  expect(newTiles).toEqual(newOne);
	expect(boardLogic.numEmptyTiles).toBe(initialNumEmpty + 1);
	expect(boardLogic.biggestTile).toBe(4);
});

// shiftUp
test("shift Up one no merge yet", () => {
	let newTiles = [...mixed];
	boardLogic.shiftUp(newTiles);
  expect(newTiles).toEqual(mixed);
});

// shiftUp
test("shift Up none possible", () => {
	const newOne = [
		[2, 2, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0]
	];
	let newTiles = [...newOne];
	boardLogic.shiftUp(newTiles);
  expect(newTiles).toEqual(newOne);
	expect(boardLogic.numEmptyTiles).toBe(initialNumEmpty);
});

// shiftUp
test("full shift up", () => {
	const newOne = [
		[4, 4, 2, 2], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0]
	];
	let newTiles = [...newOne];
	boardLogic.shiftUp(newTiles);
  expect(newTiles).toEqual(newOne);
	expect(boardLogic.numEmptyTiles).toBe(initialNumEmpty);
});

test("update", () => {
	boardLogic.update(DIRECTION.UP);
	boardLogic.update(DIRECTION.UP);
	console.log(boardLogic.tiles);
	boardLogic.update(DIRECTION.UP);
	console.log(boardLogic.tiles);
	boardLogic.update(DIRECTION.UP);
	console.log(boardLogic.tiles);
	expect(boardLogic.numEmptyTiles).toBeLessThan(initialNumEmpty);
});
