import { Masonry } from 'gestalt';
import React, { createRef } from 'react';
import useWindowSizeContext from '../contexts/WindowSizeContext';
import { size } from '../utils/breakpoints';
import Artwork from './Artwork';

const ArtworkList = ({ items = [], loadItems = () => {} }) => {
	const { width } = useWindowSizeContext();
	const masonryRef = createRef();

	const getGutterSize = () => {
		return width < size.md ? 5 : 24;
	};

	const getScrollContainer = () => {
		return typeof window !== 'undefined' ? window : null;
	};

	return (
		<Masonry
			comp={({ data }) => <Artwork value={data} />}
			items={items}
			gutterWidth={getGutterSize()}
			minCols={2}
			loadItems={loadItems}
			scrollContainer={getScrollContainer}
			ref={masonryRef}
			flexible
			virtualize
		/>
	);
};

export default ArtworkList;
