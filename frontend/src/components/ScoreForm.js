import React from "react";
import PropTypes from 'prop-types';

const ScoreForm = props => {
	ScoreForm.propTypes = {
		score: PropTypes.number, 
	}

	//const handleSubmit = (event) => {
		//alert("submitted");
	//}

	return (
		//<form onSubmit={handleSubmit}>
		<form method='POST' action='/'>
			<input type="text" name="name" placeholder="Enter name"/>
			<input type="text" name="scoreValue" value={props.score}/>
			<input type="submit" value="Submit"/>
		</form>
	);
};

export default ScoreForm;