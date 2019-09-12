import React from 'react';
import PropTypes from 'prop-types';
import {THEMES} from './constants.js';

const ThemeStateContext = React.createContext();
const ThemeDispatchContext = React.createContext();

const themeReducer = (state, action) => {
	switch (action) {
		case 'light':
			document.documentElement.setAttribute("data-theme", 'dark');
			return {color: THEMES.dark, fun: state.fun};
		case 'dark':
			document.documentElement.setAttribute("data-theme", 'light');
			return {color: THEMES.light, fun: state.fun};
		case 'ultra':
			return {color: state.color, fun: 'normal'};
		case 'normal':
			return {color: state.color, fun: THEMES.ultra};
		default: 
			document.documentElement.setAttribute("data-theme", 'light');
			return {color: THEMES.light, fun: 'normal'};
	}
}

const ThemeProvider = ({children}) => {
	ThemeProvider.propTypes = {
		children: PropTypes.isRequired
	}

	const [state, dispatch] = 
		React.useReducer(themeReducer, {color: 'light', fun: 'normal'});
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
