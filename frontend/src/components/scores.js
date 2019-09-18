import React, { useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { postScore } from '../scoresAPI.js'

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
