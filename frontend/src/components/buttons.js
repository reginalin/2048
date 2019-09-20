/**
 * Button components
 */
import React from "react";
import { THEMES, GAME_ACTION} from 'utilities/constants.js'
import { useThemeState, useThemeDispatch } from 'context/themeContext.js';
import { useGameDispatch } from 'context/gameContext.js';

// Toggle between color themes
const ToggleLightDark = () => {
	let theme = useThemeState().color;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.light ? 'dark mode' : 'light mode' }	
		</button>
	);
}

// Toggle between fun themes
const ToggleNormalUltra = () => {
	let theme = useThemeState().fun;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.normal ? 'ultra mode' : 'normal mode' }	
		</button>
	);
}

// Start game 
const StartButton = () => {
	let dispatch = useGameDispatch();
	return (
		<button 
			className="startButton"
			onClick={() => {
				dispatch({type: GAME_ACTION.restart});
			}} > new game 
		</button>
	);
};

export { 
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
};
