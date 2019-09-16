import React, { useContext, useState } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { GameContext} from '../index.js'
import { postScoreRoute } from '../constants.js'

const ScoreForm = props => {
	ScoreForm.propTypes = {
		score: PropTypes.string, 
	}
	const [username, setUsername] = useState('someone');
	const [score, setScore] = useState(props.score);

	const postScore = () => {
		axios.post(postScoreRoute, 
			{'username': username, 'score': score})
			.then( response => console.log(response.data) )
			.catch((e) => {console.log('cant access high scores', e)});
	}

	const handleFormUsername = event => {
		setUsername(event.target.value)
	}

	return (
		<form className='scoreForm' onSubmit={postScore} >
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
	var topScores = props.scores;
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

const StartButton = () => {
	const { setRestart } = useContext(GameContext);
	return (
		<button 
			className="startButton"
			onClick={() => setRestart(true)} > Restart
		</button>
	);
};

export { ScoreForm, TopScoresDisplay, StartButton };
