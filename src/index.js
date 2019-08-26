import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Tile(props) {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// return True if game over
function gameOver() {
  return false;
}

// create empty board

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimension: 4,
      tiles: this.createBoard(),
      gameOver: false
    };
  }
  createBoard() {
    let board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    return board;
  }
  handleClick(i, j) {
    const tiles = this.state.tiles.slice();
    const dimension = 4;

    //ignore click if game has been won
    //if (calculateWinner(tiles) || tiles[i]) {
    //return;
    //}
    //tiles[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      dimension: dimension,
      tiles: tiles,
      gameOver: gameOver
      //xIsNext: !this.state.xIsNext,
    });
  }
  renderTile(i, j) {
    return (
      <Tile
        value={this.state.tiles[i][j]}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }
  renderRow(i) {
    return (
      <div className="board-row">
        {this.renderTile(i, 0)}
        {this.renderTile(i, 1)}
        {this.renderTile(i, 2)}
        {this.renderTile(i, 3)}
      </div>
    );
  }

  render() {
    let status = true; // later: replace status with timer
    //const winner = calculateWinner(this.state.tiles);
    //let status;
    //if (winner) {
    //status = 'Winner: ' + winner;
    //} else {
    //status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    //}

    return (
      <div>
        <div className="status">{status}</div>
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
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
