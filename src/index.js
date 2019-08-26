import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const dimension = 4;

//// return True if game over
//function gameOver() {
//return false;
//}

//// generates new num in random spot and updates board
//function newNum(tiles) {
//let newTiles = tiles.slice();
//let row = Math.floor(Math.random() * dimension);
//let col = Math.floor(Math.random() * dimension);
//if (tiles[row][col] === 0) {
//newTiles[row][col] = 2;
//} else {
//newNum(tiles);
//}
//return newTiles;
//}

//function Tile(props) {
//return (
//<button className="tile" onClick={props.onClick}>
//{props.value}
//</button>
//);
//}

//function createBoard() {
//let tiles = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
//let newTiles = newNum(tiles);
//return newTiles;
//}

////class Board extends React.Component {
//function Board(props) {
//const [tiles, setTiles]: useState([]);
//const [gameOver, setGameOver]: useState(false);
//// hook: on keypress, setState to change tiles
//useEffect(() => {
//setTiles = createBoard();
//});
//renderTile(i, j) {
//return (
//<Tile
//value={this.state.tiles[i][j]}
//onClick={() => this.handleClick(i, j)}
///>
//);
//}
//renderRow(i) {
//return (
//<div className="board-row">
//{this.renderTile(i, 0)}
//{this.renderTile(i, 1)}
//{this.renderTile(i, 2)}
//{this.renderTile(i, 3)}
//</div>
//);
//}

//render() {
//let status = true; // later: replace status with timer
////const winner = calculateWinner(this.state.tiles);
////let status;
////if (winner) {
////status = 'Winner: ' + winner;
////} else {
////status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
////}

//return (
//<div>
//<div className="status">{status}</div>
//{this.renderRow(0)}
//{this.renderRow(1)}
//{this.renderRow(2)}
//{this.renderRow(3)}
//</div>
//);
//}
//}

// hook
function useKeyPress() {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  function move({ key }) {
    let pressed = "";
    switch (key) {
      case "k":
        pressed = "up";
        break;
      case "j":
        pressed = "down";
        break;
      case "h":
        pressed = "left";
        break;
      case "l":
        pressed = "right";
        break;
      default:
        pressed = "";
        break;
    }
    console.log(`pressed ${pressed}`);
    return true;
  }

  function downHandler({ key }) {
    console.log("key down");
    if (move({ key })) {
      setKeyPressed(true);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
}

function Game() {
  const pressed = useKeyPress();

  return (
    <div className="game">
      <div>{pressed}</div>
    </div>
  );

  //<div className="game-board">
  //<Board />
  //</div>
  //<div className="game-info">
  //<div>{[> status <]}</div>
  //<ol>{[> TODO <]}</ol>
  //</div>
}

//function calculateWinner(tiles) {
//const lines = [
//[0, 1, 2],
//[3, 4, 5],
//[6, 7, 8],
//[0, 3, 6],
//[1, 4, 7],
//[2, 5, 8],
//[0, 4, 8],
//[2, 4, 6],
//];
//for (let i = 0; i < lines.length; i++) {
//const [a, b, c] = lines[i];
//if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
//return tiles[a];
//}
//}
//return null;
//}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
