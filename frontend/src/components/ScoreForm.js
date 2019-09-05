import React from "react";

const ScoreForm = () => {

	const handleSubmit = (event) => {
		alert("submitted");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="name" placeholder="Enter name"/>
			<input type="text" name="score" placeholder="Enter score"/>
			<input type="submit" value="Submit"/>
		</form>
	);
};

export default ScoreForm;
