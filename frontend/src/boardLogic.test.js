import { dimension, DIRECTION, initialTiles } from "./constants.js";
import { BoardLogic } from "./BoardLogic.js";

test("simple test", () => {
  expect(1).toBe(1);
});

test("directions enum", () => {
  expect("up").toBe(DIRECTION.UP);
});

const boardLogic = new BoardLogic(initialTiles, dimension);

test("initialize boardLogic", () => {
	console.log(boardLogic.tiles)
  expect("up").toBe(DIRECTION.UP);
});

// generate new num
test("random index", () => {
	let random = boardLogic.getRandomIndex();
  expect(random).toBeGreaterThanOrEqual(0);
	expect(random).toBeLessThanOrEqual(12);
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
