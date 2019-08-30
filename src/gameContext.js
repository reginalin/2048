import React, { createContext } from "react";

const GameContext = createContext({
  theme: "",
  updateTheme: () => {},
  gameOver: false,
  checkGameOver: () => {},
  keyPressed: null
});

export default GameContext;
