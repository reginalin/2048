import React from 'react';
import {THEMES} from './constants.js';

const ThemeStateContext = React.createContext();
const ThemeDispatchContext = React.createContext();

const themeReducer = (state, action) => {
	switch (action) {
		case THEMES.light:
			document.documentElement.setAttribute("data-theme", 'dark');
			return {color: THEMES.dark, fun: state.fun};
		case THEMES.dark:
			document.documentElement.setAttribute("data-theme", 'light');
			return {color: THEMES.light, fun: state.fun};
		case THEMES.ultra:
			document.documentElement.setAttribute("fun-theme", 'normal');
			return {color: state.color, fun: THEMES.normal};
		case THEMES.normal:
			document.documentElement.setAttribute("fun-theme", 'ultra');
			return {color: state.color, fun: THEMES.ultra};
		default: 
			document.documentElement.setAttribute("data-theme", 'light');
			document.documentElement.setAttribute("fun-theme", 'normal');
			return {color: THEMES.light, fun: THEMES.normal};
	}
}

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

const useThemeState = () => {
	const themeContext = React.useContext(ThemeStateContext);
	if (themeContext === undefined) {
		throw new Error('themeContext must be used within a ThemeProvider');
	}
	return themeContext;
}

const useThemeDispatch = () => {
	const themeContext = React.useContext(ThemeDispatchContext);
	if (themeContext === undefined) {
		throw new Error('themeContext must be used within a ThemeProvider');
	}
	return themeContext;
}

export { ThemeProvider, useThemeState, useThemeDispatch }
