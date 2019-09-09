import React from "react";
import PropTypes from 'prop-types';

const Tile = props => {
	Tile.propTypes = {
		onClick: PropTypes.func,
		value: PropTypes.number,
	}

  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Tile;
