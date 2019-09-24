/**
 * Display components relating to scores
 */
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { postScore } from 'middleware/scoresAPI.js'

// Form to submit username and score to database
const ScoreForm = props => {
	ScoreForm.propTypes = {
		// score is the ending game time
		score: PropTypes.string, 
	}

	const [username, setUsername] = useState('anonymous');

	// Submit form content (username and score) to backend
	const handleSubmit = () => {
		postScore(username, props.score);
	}

	// Updates form username based on user input
	const handleFormUsername = event => {
		setUsername(event.target.value);
	}

	return (
		<form className="scoreForm" onSubmit={handleSubmit} >
			<input 
				type="text" 
				name="name" 
				placeholder="Enter name"
				autocomplete="off"
				onChange={handleFormUsername}
			/>
			<input 
				type="text" 
				name="scoreValue" 
				value={props.score}
				readOnly
			/>
			<input type="submit" value="Submit"/>
		</form>
	);
};

// Shows top 10 scores
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
