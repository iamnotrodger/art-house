import React from 'react';
import styled from 'styled-components';
import ImageCover from '../elements/ImageCover';
import breakpoints from '../utils/breakpoints';

const defaultImageSizes = `${breakpoints.lg} 192px, 122px`;

const ArtistHeader = ({ value = {}, imageSizes = defaultImageSizes }) => {
	const { name, images } = value;

	return (
		<Container>
			<ImageContainer>
				<ImageCover images={images} sizes={imageSizes} alt='artist' />
			</ImageContainer>
			<Info>
				<Name>{name}</Name>
				<Title>Artist</Title>
			</Info>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 1rem;
	gap: 0.5rem;

	@media ${breakpoints.md} {
		flex-direction: row;
		padding-bottom: 2rem;
		gap: 2rem;
	}
`;
const ImageContainer = styled.div`
	width: 7rem;
	height: 7rem;
	overflow: hidden;
	border-radius: var(--rounded-full);

	@media ${breakpoints.md} {
		width: 12rem;
		height: 12rem;
	}
`;
const Info = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	@media ${breakpoints.md} {
		max-width: 65%;
		align-items: flex-start;
	}
`;
const Name = styled.h1`
	font-size: var(--text-2xl);
	font-weight: var(--font-bold);
	line-height: 1.1;

	@media ${breakpoints.md} {
		font-size: var(--text-6xl);
	}
`;
const Title = styled.div`
	font-family: var(--font-secondary);
	font-size: var(--text-base);

	@media ${breakpoints.md} {
		font-size: var(--text-xl);
	}
`;

export default ArtistHeader;
