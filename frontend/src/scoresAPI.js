import { useState, useEffect } from 'react';
import axios from 'axios';
import { getScoresRoute } from './constants.js';

/**
 * Get scores from flask backend
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

export { useBackendScores };
