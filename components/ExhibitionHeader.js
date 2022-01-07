import React from 'react';
import styled from 'styled-components';
import ImageCover from '../elements/ImageCover';
import Subtitle from '../elements/Subtitle';
import Title from '../elements/Title';
import breakpoints, { size } from '../utils/breakpoints';

const defaultImageSizes = `${breakpoints.lg} 192px, 122px`;

const ExhibitionHeader = ({ value = {}, imageSizes = defaultImageSizes }) => {
	const { name, images } = value;
	return (
		<Container>
			<ImageContainer>
				<ImageCover images={images} sizes={imageSizes} alt='artist' />
			</ImageContainer>
			<Info>
				<Title>{name}</Title>
				<Subtitle>Exhibition</Subtitle>
			</Info>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	margin: 0 auto;
	margin-bottom: 1rem;
	border-radius: var(--rounded-3xl);
	overflow: hidden;

	@media ${breakpoints.md} {
		margin-bottom: 2rem;
	}
`;
const ImageContainer = styled.div`
	height: 15rem;

	@media ${breakpoints.md} {
		height: 25rem;
	}
`;
const Info = styled.div`
	color: var(--color-light);
	position: absolute;
	bottom: 0;
	left: 0;
	margin: 1rem;

	@media ${breakpoints.md} {
		margin: 2rem;
	}
`;

export default ExhibitionHeader;
