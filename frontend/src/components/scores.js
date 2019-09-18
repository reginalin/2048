/**
 * Displays relating to scores
 */
import React, { useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { postScore } from '../scoresAPI.js'

/**
 * Form that takes in a user's name and assigns it to a score
 */
const ScoreForm = props => {
	ScoreForm.propTypes = {
		score: PropTypes.string, 
	}
	const [username, setUsername] = useState('anonymous');
	const [score, setScore] = useState(props.score);

	const handleSubmit = () => {
		postScore(username, score);
	}

	const handleFormUsername = event => {
		setUsername(event.target.value);
	}

	return (
		<form className='scoreForm' onSubmit={handleSubmit} >
			<input 
				type="text" 
				name="name" 
				placeholder="Enter name"
				onChange={handleFormUsername}
			/>
			<input type="text" name="scoreValue" 
				value={props.score}
				readOnly
			/>
			<input type="submit" value="Submit"/>
		</form>
	);
};

/**
 * Display of top 10 users with corresponding scores
 */
const TopScoresDisplay = props => {
	let topScores = props.scores;
	return (
		<div>
			{topScores.map(score => 
				<div key={score.id}>
					<p>{score.name}: {score.scoreValue} </p> 
				</div>
			)}
		</div>
	);
}

export {
	ScoreForm, 
	TopScoresDisplay, 
};
