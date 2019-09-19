/**
 * Handle global application themes using React Context
 */

import React from 'react';
import {THEMES} from './constants.js';

const ThemeStateContext = React.createContext();
const ThemeDispatchContext = React.createContext();

/**
 * Toggles theme state between (light, dark) and (normal, ultra)
 */
const themeReducer = (state, action) => {
	switch (action) {
		case THEMES.light:
			document.documentElement.setAttribute("color-theme", 'dark');
			return {color: THEMES.dark, fun: state.fun};
			break;
		case THEMES.dark:
			document.documentElement.setAttribute("color-theme", 'light');
			return {color: THEMES.light, fun: state.fun};
			break;
		case THEMES.ultra:
			document.documentElement.setAttribute("fun-theme", 'normal');
			return {color: state.color, fun: THEMES.normal};
			break;
		case THEMES.normal:
			document.documentElement.setAttribute("fun-theme", 'ultra');
			return {color: state.color, fun: THEMES.ultra};
			break;
		default: 
			document.documentElement.setAttribute("color-theme", 'light');
			document.documentElement.setAttribute("fun-theme", 'normal');
			return {color: THEMES.light, fun: THEMES.normal};
			break;
	}
}

/**
 * Custom hook providing ThemeStateContext
 */
const useThemeState = () => {
	const themeContext = React.useContext(ThemeStateContext);
	if (themeContext === undefined) {
		throw new Error('themeContext must be used within a ThemeProvider');
	}
	return themeContext;
}

/**
 * Custom hook providing ThemeDispatchContext
 */
const useThemeDispatch = () => {
	const themeContext = React.useContext(ThemeDispatchContext);
	if (themeContext === undefined) {
		throw new Error('themeContext must be used within a ThemeProvider');
	}
	return themeContext;
}

/**
 * Context provider for theme context 
 * Gives theme context state and dispatch function to alter context state
 */
const ThemeProvider = ({children}) => {
	const [state, dispatch] = 
		React.useReducer(themeReducer, {color: THEMES.light, fun: THEMES.normal});
	return (
		<ThemeStateContext.Provider value={state}>
			<ThemeDispatchContext.Provider value={dispatch}>
				{children}
			</ThemeDispatchContext.Provider>
		</ThemeStateContext.Provider>
	);
}


export { ThemeProvider, useThemeState, useThemeDispatch };
