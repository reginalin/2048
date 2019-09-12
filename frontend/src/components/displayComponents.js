import React from "react";
import PropTypes from 'prop-types';

const ScoreForm = props => {
	ScoreForm.propTypes = {
		score: PropTypes.number, 
	}
	return (
		<form className='scoreForm' method='POST' action='/'>
			<input type="text" name="name" placeholder="Enter name"/>
			<input type="text" name="scoreValue" value={props.score}/>
			<input type="submit" value="Submit"/>
		</form>
	);
};

const startButton = () => {
  return <button className="startButton"></button>;
};

// TO DO: replace board when game over
const GameEndDisplay = () => {
  return <p> whooo </p>;
};

export { ScoreForm, startButton, GameEndDisplay };
