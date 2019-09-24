import { dimension, DIRECTION } from "../utilities/constants.js";

import {
  merge,
  slideUp,
  slideDown,
  slide,
  shift,
  updateBoard
} from "./board.js";

test("simple test", () => {
  expect(1).toBe(1);
});

test("directions enum", () => {
  expect("up").toBe(DIRECTION.UP);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// merge TESTS

test("merge both empty", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  merge(tiles, 0, 0, 0, 1);
  expect(tiles).toEqual(newTiles);
});

test("merge into empty", () => {
  var tiles = [[0, 0, 0, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  merge(tiles, 0, 2, 1, 2);
  expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// slideUp TESTS

test("slideUp, no change nonzero col", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, no change zero col", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 1);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, no change multiple items in row", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, one space to end", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, from center", () => {
  var tiles = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, two in center", () => {
  var tiles = [[0, 0, 0, 2], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, from end", () => {
  var tiles = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideUp, two at end", () => {
  var tiles = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideUp(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shiftDown TESTS

test("slideDown, no change nonzero col", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, no change zero col", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slideDown(tiles, 1);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, no change multiple items in row", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 2, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, one space to end", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 2, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, from center", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 0, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, two in center", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0], [0, 0, 0, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, from end", () => {
  var tiles = [[0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 2]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

test("slideDown, two at end", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0]];
  slideDown(tiles, 2);
  expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// shift TESTS

test("shift up, same result", () => {
  var tiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  shift(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

test("shift up, adjacent, beginning rows, same num", () => {
  let tiles = [[0, 0, 2, 2], [0, 2, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  let newTiles = [[0, 0, 4, 2], [0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  shift(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

test("shift up, end, same num", () => {
  let tiles = [[0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 2, 0], [0, 0, 2, 0]];
  let newTiles = [[0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 4, 0], [0, 0, 0, 0]];
  shift(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

test("shift up, no shift different num", () => {
  let tiles = [[0, 2, 4, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  let newTiles = [[0, 2, 4, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  shift(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// slide TESTS

test("slide, no change", () => {
  var tiles = [[0, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slide(tiles, "");
  expect(tiles).toEqual(newTiles);
});

test("slide up", () => {
  var tiles = [[0, 0, 0, 0], [2, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[2, 2, 2, 2], [0, 0, 2, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slide(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

test("slide, up no change", () => {
  var tiles = [[0, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[0, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  slide(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});

test("slide up full board", () => {
  var tiles = [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]];
  var newTiles = [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]];
  slide(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});
test("slide up with space", () => {
  var tiles = [[8, 8, 16, 2], [2, 0, 4, 0], [0, 0, 0, 0], [2, 0, 0, 0]];
  var newTiles = [[8, 8, 16, 2], [2, 0, 4, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
  slide(tiles, DIRECTION.UP);
  expect(tiles).toEqual(newTiles);
});
test("slide down", () => {
  var tiles = [[0, 0, 0, 0], [2, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [2, 2, 2, 2]];
  slide(tiles, DIRECTION.DOWN);
  expect(tiles).toEqual(newTiles);
});

test("slide down no change", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [2, 2, 2, 2]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 2, 0], [2, 2, 2, 2]];
  slide(tiles, DIRECTION.DOWN);
  expect(tiles).toEqual(newTiles);
});

test("slide left", () => {
  var tiles = [[0, 0, 0, 0], [2, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [2, 2, 0, 0], [2, 2, 0, 0], [2, 0, 0, 0]];
  slide(tiles, DIRECTION.LEFT);
  expect(tiles).toEqual(newTiles);
});

test("slide right", () => {
  var tiles = [[0, 0, 0, 0], [2, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 2, 2], [0, 0, 2, 2], [0, 0, 0, 2]];
  slide(tiles, DIRECTION.RIGHT);
  expect(tiles).toEqual(newTiles);
});

test("slide left right", () => {
  var tiles = [[0, 0, 0, 0], [2, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 2, 2], [0, 0, 2, 2], [0, 0, 0, 2]];
  slide(tiles, DIRECTION.LEFT);
  slide(tiles, DIRECTION.RIGHT);
  expect(tiles).toEqual(newTiles);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// updateBoard TESTS

test("updateBoard up no merge", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 2, 2, 0], [2, 0, 0, 0]];
  var newTiles = [[2, 2, 2, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.UP);
  expect(modified).toEqual(newTiles);
});

test("updateBoard Up with merge", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 2, 4, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.UP);
  expect(modified).toEqual(newTiles);
});

test("updateBoard Up empty space middle", () => {
  var tiles = [[16, 4, 8, 4], [2, 0, 0, 0], [0, 0, 0, 2], [0, 0, 0, 2]];
  var newTiles = [[16, 4, 8, 4], [2, 0, 0, 4], [0, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.UP);
  expect(modified).toEqual(newTiles);
});

test("updateBoard up empty space middle on left", () => {
  var tiles = [[8, 8, 16, 2], [2, 0, 4, 0], [0, 0, 0, 0], [2, 0, 0, 0]];
  var newTiles = [[8, 8, 16, 2], [4, 0, 4, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.UP);
  expect(modified).toEqual(newTiles);
});
test("updateBoard left with merge", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [2, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.LEFT);
  expect(modified).toEqual(newTiles);
});

test("updateBoard down with merge", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 2, 4, 2]];
  var modified = updateBoard(tiles, DIRECTION.DOWN);
  expect(modified).toEqual(newTiles);
});

test("updateBoard right with merge", () => {
  var tiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 2, 2, 0], [0, 0, 2, 0]];
  var newTiles = [[0, 0, 0, 0], [0, 0, 0, 2], [0, 0, 0, 4], [0, 0, 0, 2]];
  var modified = updateBoard(tiles, DIRECTION.RIGHT);
  expect(modified).toEqual(newTiles);
});

test("updateBoard right two merges", () => {
  var tiles = [[0, 2, 4, 4], [0, 0, 2, 2], [0, 0, 0, 2], [0, 0, 0, 0]];
  var newTiles = [[0, 0, 2, 8], [0, 0, 0, 4], [0, 0, 0, 2], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.RIGHT);
  expect(modified).toEqual(newTiles);
});

test("updateBoard left one merge", () => {
  var tiles = [[2, 2, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
  var newTiles = [[4, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.LEFT);
  expect(modified).toEqual(newTiles);
});

test("updateBoard left two merges", () => {
  var tiles = [[0, 2, 4, 4], [0, 0, 2, 2], [0, 0, 0, 2], [0, 0, 0, 0]];
  var newTiles = [[2, 8, 0, 0], [4, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]];
  var modified = updateBoard(tiles, DIRECTION.LEFT);
  expect(modified).toEqual(newTiles);
});
