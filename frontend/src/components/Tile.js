import React from "react";

const Tile = props => {
  return (
    <button className="tile" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Tile;
