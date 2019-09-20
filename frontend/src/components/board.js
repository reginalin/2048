/**
 * display game Board made of Tile pieces 
 * number of Tiles in a Board = (dimension * dimension) 
 */
import React from 'react';
import PropTypes from 'prop-types';
import { dimension } from 'utilities/constants.js';
import { useGameState } from 'context/gameContext.js';
import 'style/style.css';
import 'style/tiles.css';

const Tile = props => {
	Tile.propTypes = {
		value: PropTypes.number,
	}

	let tileNum = props.value;
	let tileType = '';

	// handle styling for different tyle values 
	if (tileNum === 0) {
		tileType = 'blankTile';
	} else {
		tileType = `nonBlankTile tile${tileNum}`;
	}

  return (
    <button className={`tile ${tileType}`}>
      {tileNum}
    </button>
  );
};

export const Board = () => {
	const tiles = useGameState().tiles;
	const rows = [...Array(dimension).keys()];

  const renderTile = (i, j) => {
    return <Tile key={`${i}${j}`} value={tiles[i][j]} />;
  };

	const renderRow = i => {
		return (
			<div key={i} className='board-row'>
				{rows.map(row => renderTile(i, row))}
			</div>
		);
	};

  return (
    <div className='board'>
			{rows.map(row => renderRow(row))}
    </div>
  );
};
