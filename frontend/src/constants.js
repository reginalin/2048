export const dimension = 4;

export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};

export const winningTile = 16;

export const initialTime = '00:00:00';

export const initialTiles = [
															[0, 0, 0, 0], 
															[0, 0, 0, 0],
															[0, 0, 0, 0], 
															[0, 0, 0, 0], 
														];

export const THEMES = {
	light: 'light',
  dark: 'dark',
  ultra: 'ultra',
	normal: 'normal',
}

export const getScoresRoute = 'http://localhost:5000/users'

export const postScoreRoute = 'http://localhost:5000/user'
