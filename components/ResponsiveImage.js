import React from 'react';

const ResponsiveImage = ({ images = [], ...props }) => {
	if (images.length === 0) {
		return <img {...props} />;
	}

	const srcSet = images
		.map((image) => `${image.url} ${image.width}w`)
		.join(',');

	return <img src={images[0].url} srcSet={srcSet} {...props} />;
};

export default ResponsiveImage;
