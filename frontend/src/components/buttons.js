/**
 * Button components
 */
import React, { useContext } from "react";
import { THEMES } from '../constants.js'
import { GameContext} from '../game.js'
import { useThemeState, useThemeDispatch } from '../themeContext.js';

/**
 * Toggle between color themes (dark, light)
 */
const ToggleLightDark = () => {
	let theme = useThemeState().color;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.light ? 'dark mode' : 'light mode' }	
		</button>
	);
}

/**
 * Toggle between fun themes (ultra, normal)
 */
const ToggleNormalUltra = () => {
	let theme = useThemeState().fun;
	let dispatch = useThemeDispatch();
	return (
		<button onClick={() => dispatch(theme)}>
			{ theme === THEMES.normal ? 'ultra mode' : 'normal mode' }	
		</button>
	);
}

/**
 * Button to start / restart a game
 */
const StartButton = () => {
	const { setRestart } = useContext(GameContext);
	return (
		<button 
			className="startButton"
			onClick={() => setRestart(true)} > Restart
		</button>
	);
};

export { 
	StartButton,
	ToggleLightDark,
	ToggleNormalUltra,
};
