//////////////////////////////////////////////////
// Board constants
//////////////////////////////////////////////////
export const dimension = 4;

export const winningTile = 16;

export const initialTiles = [
	[0, 0, 0, 0], 
	[0, 0, 0, 0],
	[0, 0, 0, 0], 
	[0, 0, 0, 0], 
];

export const initialTime = '00:00:00';

export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};


//////////////////////////////////////////////////
// Game Context reducer actions
//////////////////////////////////////////////////
export const THEMES = {
	light: 'light',
  dark: 'dark',
  ultra: 'ultra',
	normal: 'normal',
}

export const GAME_ACTION = {
	won: 'won',
	lost: 'lost',
	restart: 'restart',
	restart_over: 'restart_over',
	update_tiles: 'update_tiles',
	update_time: 'update_time',
}

//////////////////////////////////////////////////
// Routes 
//////////////////////////////////////////////////
export const getScoresRoute = 'http://localhost:5000/users'
export const postScoreRoute = 'http://localhost:5000/user'
