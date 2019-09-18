import { dimension, DIRECTION, initialTiles } from "./constants.js";
import { BoardLogic } from "./BoardLogic.js";

test("simple test", () => {
  expect(1).toBe(1);
});

test("directions enum", () => {
  expect("up").toBe(DIRECTION.UP);
});

test("initialize boardLogic", () => {
	const boardLogic = new BoardLogic(initialTiles, dimension);
	console.log(boardLogic.tiles)
  expect("up").toBe(DIRECTION.UP);
});

//restart
// getters // 

// tiles
// biggestTile
// numEmptyTiles
// setters //
// set biggestTile
// set numEmptyTiles
// can merge
// mergingIntoEmpty
// emptyTile
// slide 
// merge
// shiftUp
// shiftleft
// shiftDown
// shiftRight
// shift
// numToGenerate
// emptyTilesRemaining
// generateNewNum
// update
