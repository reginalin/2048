import { useState, useEffect } from 'react';
import axios from 'axios';
import { getScoresRoute, postScoreRoute } from './constants.js';

/**
 * Custom hook that gets scores from flask backend
 */
const useBackendScores = () => {
	const [topScores, setTopScores] = useState([]);

	useEffect(() => {
		const getScores = async () => {
			await axios.get(getScoresRoute)
				.then(json => {
						console.log(json.data.scores);
						setTopScores(json.data.scores);
				}).catch((e) => {console.log('cant access high scores', e)});
		};

		getScores();
	}, []);

	return topScores;
}

/**
 * Returns score data in appropriate format for backend
 */
const formatScoreData = (username, score) => {
	return {'username': username, 'score': score};
}

/**
 * Posts score to backend
 */
const postScore = (username, score) => {
	axios.post(postScoreRoute, formatScoreData(username, score))
		.then( response => console.log(response.data) )
		.catch((e) => {console.log('cant access high scores', e)});
}

export { useBackendScores, postScore };
