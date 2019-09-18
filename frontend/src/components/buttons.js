import React, { useContext } from "react";
import { THEMES } from '../constants.js'
import { GameContext} from '../game.js'
import { useThemeState, useThemeDispatch } from '../themes.js';

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
