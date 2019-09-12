import React from 'react';
import PropTypes from 'prop-types';
import {THEMES} from './constants.js';

const ThemeStateContext = React.createContext();
const ThemeDispatchContext = React.createContext();

const themeReducer = (state, action) => {
	switch (action) {
		case 'toggle':
			if (state.theme === 'light') {
				document.documentElement.setAttribute("data-theme", 'dark');
				return {theme: THEMES.dark};
			} else if (state.theme === 'dark') {
				document.documentElement.setAttribute("data-theme", 'light');
				return {theme: THEMES.light};
			}
			break;
		//case 'light':
			//document.documentElement.setAttribute("data-theme", 'light');
			//return {theme: THEMES.light};
		//case 'dark':
			//document.documentElement.setAttribute("data-theme", 'dark');
			//return {theme: THEMES.dark};
		//case 'ultra':
			//document.documentElement.setAttribute("data-theme", 'ultra');
			//return {theme: THEMES.ultra};
		default: 
			document.documentElement.setAttribute("data-theme", 'light');
			return {theme: THEMES.light};
	}
}

const ThemeProvider = ({children}) => {
	ThemeProvider.propTypes = {
		children: PropTypes.isRequired
	}

	const [state, dispatch] = 
		React.useReducer(themeReducer, {theme: 'light'});
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
