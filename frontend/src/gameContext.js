import React, { createContext } from "react";

const GameContext = createContext({
  gameTime: { hours: 0, minutes: 0, seconds: 0 },
  setGameTime: () => {}
});

export default GameContext;
