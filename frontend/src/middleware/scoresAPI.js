import { useState, useEffect } from 'react';
import axios from 'axios';
import { getScoresRoute, postScoreRoute } from 'utilities/constants.js';

/**
 * Custom hook that gets scores from flask backend
 * @return {!Array <json>} list of json objects containing username, score1
 */
const useBackendScores = () => {
	const [topScores, setTopScores] = useState([]);

	useEffect(() => {
		const getScores = async () => {
			await axios.get(getScoresRoute)
				.then(json => {
						setTopScores(json.data.scores);
				}).catch((e) => {
					console.log('cant access high scores');
				});
		};
		getScores();
	}, []);

	return topScores;
}

/**
 * Get score data in appropriate format for backend
 * @param {string} username The name corresponding to the score
 * @param {string} score Score to be added, in time format XX:XX:XX 
 * @return {json} json object to be posted to database 
 */
const formatScoreData = (username, score) => {
	return {'username': username, 'score': score};
}

/**
 * Posts score to backend
 * @param {string} username The name corresponding to the score
 * @param {string} score Score to be added, in time format XX:XX:XX 
 */
const postScore = (username, score) => {
	axios.post(postScoreRoute, formatScoreData(username, score))
		.then( response => console.log(response.data) )
		.catch((e) => {
			console.log('cant post score');
		});
}

export { useBackendScores, postScore };
