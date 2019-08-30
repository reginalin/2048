import { dimension, DIRECTION, winningTile } from "../constants.js";

//is there a better way of doing this
const gameOver = newTiles => {
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      if (newTiles[i][j] === winningTile) {
        return true;
      }
    }
  }
  return false;
};

// side effect: modify newTiles
const merge = (newTiles, row1, col1, row2, col2) => {
  let currentVal = newTiles[row1][col1];
  let adjacentVal = newTiles[row2][col2];
  let newVal = currentVal + adjacentVal;
  newTiles[row1][col1] = currentVal + adjacentVal;
  newTiles[row2][col2] = 0;
};

// do "sliding all the way" when shift
const slideUp = (newTiles, col) => {
  //slide incrementally
  for (let row = 0; row < dimension - 1; row++) {
    if (newTiles[row][col] === 0) {
      let row2 = row + 1;
      //slide next available non blank tile
      while (row2 < dimension - 1 && newTiles[row2][col] === 0) {
        row2 += 1;
      }
      merge(newTiles, row, col, row2, col);
    }
  }
  return newTiles;
};

const slideLeft = (newTiles, row) => {
  for (let col = 0; col < dimension - 1; col++) {
    if (newTiles[row][col] === 0) {
      let col2 = col + 1;
      while (col2 < dimension - 1 && newTiles[row][col2] === 0) {
        col2 += 1;
      }
      merge(newTiles, row, col, row, col2);
    }
  }
  return newTiles;
};

const slideDown = (newTiles, col) => {
  for (let row = dimension - 1; row > 0; row--) {
    if (newTiles[row][col] === 0) {
      let row2 = row - 1;
      while (row2 > 0 && newTiles[row2][col] === 0) {
        row2 -= 1;
      }
      merge(newTiles, row, col, row2, col);
    }
  }
  return newTiles;
};

const slideRight = (newTiles, row) => {
  for (let col = dimension - 1; col > 0; col--) {
    if (newTiles[row][col] === 0) {
      let col2 = col - 1;
      while (col2 > 0 && newTiles[row][col2] === 0) {
        col2 -= 1;
      }
      merge(newTiles, row, col, row, col2);
    }
  }
  return newTiles;
};

const slideWholeBoard = (newTiles, direction) => {
  for (let col = 0; col < dimension; col++) {
    switch (direction) {
      case DIRECTION.UP:
        slideUp(newTiles, col);
        break;
      case DIRECTION.DOWN:
        slideDown(newTiles, col);
        break;
      case DIRECTION.LEFT:
        slideLeft(newTiles, col);
        break;
      case DIRECTION.RIGHT:
        slideRight(newTiles, col);
        break;
      default:
        console.log("not a direction");
      //do nothing
    }
  }
};

// modify board with merged tiles newTiles up one
const shiftUp = newTiles => {
  for (let row = 0; row < dimension - 1; row++) {
    for (let col = 0; col < dimension; col++) {
      let nextRow = row + 1;
      if (newTiles[row][col] === newTiles[nextRow][col]) {
        merge(newTiles, row, col, nextRow, col);
      }
    }
  }
};

const shiftLeft = newTiles => {
  for (let row = 0; row < dimension; row++) {
    for (let col = 0; col < dimension - 1; col++) {
      let nextCol = col + 1;
      if (newTiles[row][col] === newTiles[row][nextCol]) {
        merge(newTiles, row, col, row, nextCol);
      }
    }
  }
};

const shiftDown = newTiles => {
  for (let row = dimension - 1; row > 0; row--) {
    for (let col = dimension - 1; col > 0; col--) {
      let nextRow = row - 1;
      if (newTiles[row][col] === newTiles[nextRow][col]) {
        merge(newTiles, row, col, nextRow, col);
      }
    }
  }
};

const shiftRight = newTiles => {
  for (let row = 0; row < dimension; row++) {
    for (let col = dimension - 1; col > 0; col--) {
      let nextCol = col - 1;
      if (newTiles[row][col] === newTiles[row][nextCol]) {
        merge(newTiles, row, col, row, nextCol);
      }
    }
  }
};

const fullMerge = (newTiles, direction) => {
  switch (direction) {
    case DIRECTION.UP:
      shiftUp(newTiles);
      break;
    case DIRECTION.DOWN:
      shiftDown(newTiles);
      break;
    case DIRECTION.LEFT:
      shiftLeft(newTiles);
      break;
    case DIRECTION.RIGHT:
      shiftRight(newTiles);
      break;
    default:
      console.log("not a direction");
    //do nothing
  }
};

// return random row or col index
const getRandomIndex = () => {
  return Math.floor(Math.random() * dimension);
};

// TO DO: detect if no empty tiles left or it will infinitely loop
// generates new num in random spot and updates board
const generateNewNum = newTiles => {
  let row = getRandomIndex();
  let col = getRandomIndex();
  if (newTiles[row][col] === 0) {
    newTiles[row][col] = 2;
  } else {
    generateNewNum(newTiles);
  }
};

// keep for testing
// happens in one board update when key pressed
const fullShift = (newTiles, direction) => {
  slideWholeBoard(newTiles, direction);
  fullMerge(newTiles, direction);
  slideWholeBoard(newTiles, direction);
  return newTiles;
};

const updateTiles = (tiles, direction) => {
  var newTiles = [...tiles];
  fullShift(newTiles, direction);
  generateNewNum(newTiles);
  return newTiles;
};

export {
  merge,
  slideUp,
  slideDown,
  slideWholeBoard,
  fullMerge,
  fullShift,
  updateTiles,
  gameOver
};
