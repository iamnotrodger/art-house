export const parseError = (error) => {
	return {
		statusCode: error.statusCode || 500,
		message: error.message || 'Oh oh! Something went wrong.',
	};
};
