export const getCursor = (pages) => {
	let cursor = 0;
	for (const page of pages) {
		cursor += page.length;
	}
	return cursor;
};
