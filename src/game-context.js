import React, { createContext } from "react";

export const GameContext = createContext({
  theme: "",
  updateTheme: () => {},
  gameOver: false,
  checkGameOver: () => {}
});
