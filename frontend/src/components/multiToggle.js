import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Toggle } from "react-triple-toggle";

var initialData = {
  left: false,
  right: false,
  middle: true
};

const MultiToggle = () => {
  let [data, setData] = useState(initialData);

  const handleChange = event => {
    switch (event) {
      case "left":
				console.log("left");
        return setData({ left: true, right: false, middle: false });
      case "middle":
				console.log("middle");
        return setData({ left: false, right: false, middle: true });
      case "right":
				console.log("right");
        return setData({ left: false, right: true, middle: false });
      default:
        return event;
    }
  };

  return <Toggle checked={data} onChange={(e) => handleChange(e)} />;
}

export { MultiToggle };
