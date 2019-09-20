import React from "react";
import { THEMES, GAME_ACTION} from '../constants.js'
import { useThemeState, useThemeDispatch } from '../themeContext.js';
import { useGameState, useGameDispatch } from '../gameContext.js';

const ToggleLightDark = () => {
	let theme = useThemeState().color;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.light ? 'dark mode' : 'light mode' }	
		</button>
	);
}

const ToggleNormalUltra = () => {
	let theme = useThemeState().fun;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.normal ? 'ultra mode' : 'normal mode' }	
		</button>
	);
}

const StartButton = () => {
	let dispatch = useGameDispatch();
	let restartVal = useGameState();
	return (
		<button 
			className="startButton"
			onClick={() => {
				dispatch({type: GAME_ACTION.restart});
			}} > Restart
		</button>
	);
};

export { 
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
};
