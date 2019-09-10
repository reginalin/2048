import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { BoardContext } from '../index.js'
import '../style.css'

const Tile = props => {
	Tile.propTypes = {
		value: PropTypes.number,
	}
  return (
    <button className="tile">
      {props.value}
    </button>
  );
};

export const Board = () => {
	const tiles = useContext(BoardContext).tiles; 
  const renderTile = (i, j) => {
    return <Tile value={tiles[i][j]} />;
  };

	const renderRow = i => {
		return (
			<div className="board-row">
				{renderTile(i, 0)}
				{renderTile(i, 1)}
				{renderTile(i, 2)}
				{renderTile(i, 3)}
			</div>
		);
	};

  return (
    <div>
			{renderRow(0)}
			{renderRow(1)}
			{renderRow(2)}
			{renderRow(3)}
    </div>
  );
};
