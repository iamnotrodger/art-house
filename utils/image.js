export const isImagePortrait = (width, height) => {
	return width <= height * 1.5;
};

export const findImageWithSize = (images) => {
	for (const image of images) {
		if (image.width && image.height) {
			return image;
		}
	}

	return null;
};

export const getSmallestImage = (images) => {
	let smallestImage = images[0];

	for (let i = 1; i < images.length; i++) {
		const image = images[i];
		if (image.width < smallestImage.width) {
			smallestImage = image;
		}
	}

	return smallestImage;
};
