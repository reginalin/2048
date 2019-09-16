import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BoardContext } from '../index.js'
import '../style/style.css'
import '../style/tiles.css'

const Tile = props => {
	Tile.propTypes = {
		value: PropTypes.number,
	}

	var tileNum = props.value;
	var tileType = '';
	if (tileNum === 0) {
		tileType = 'blankTile';
	} else {
		tileType = `nonBlankTile tile${tileNum}`;
	}
	var tileClasses = `tile ${tileType}`;
  return (
    <button className={tileClasses}>
      {tileNum}
    </button>
  );
};

export const Board = () => {
	const tiles = useContext(BoardContext).tiles; 
	let rows = [0, 1, 2, 3];

	//useEffect(() => {
		//if (tiles === initialTiles)	{
			//console.log('board')
			//console.log(tiles);
			////restart
		//}
	//}, [tiles]);

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
