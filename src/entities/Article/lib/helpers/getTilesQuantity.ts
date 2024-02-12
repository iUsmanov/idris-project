export const getTilesQuantity = () => {
	const viewportWidth = document.documentElement.clientWidth;
	const viewportHeight = document.documentElement.clientHeight;

	return Math.ceil((viewportWidth * viewportHeight) / (286 * 230));
};
