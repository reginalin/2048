/**
 * Global utility functions
 */

/** 
 * return random row or col index within range[0, dimension)
 * @param {number} dimension the upper limit
 */
export const getRandomIndex = dimension  => {
	return Math.floor(Math.random() * dimension);
};

/**
 * Gives a deep copy of 2D nested arrays
 * @param {array} nested the array to deep copy
 */
export const deepCopyNestedArray = nested => {
	return JSON.parse(JSON.stringify(nested));
}
