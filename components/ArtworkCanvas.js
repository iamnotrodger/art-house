import Link from 'next/link';
import styled from 'styled-components';
import ImageCover from '../elements/ImageCover';
import breakpoints from '../utils/breakpoints';
import ResponsiveImage from './ResponsiveImage';

const artistImageSizes = `${breakpoints.lg} 48px, 32px`;

const ArtworkCanvas = ({ value }) => {
	const { title, year, description, images, artist } = value;
	const isPortrait = images[0].width <= images[0].height * 1.5;
	const imageSizes = isPortrait ? '608px' : `${breakpoints.lg} 1024px, 608px`;

	return (
		<Canvas portrait={isPortrait}>
			<ArtworkImage
				images={images}
				sizes={imageSizes}
				alt='artwork'
				portrait={isPortrait}
			/>
			<DescriptionContainer>
				<ArtworkTitle>{title}</ArtworkTitle>
				<ArtworkYear>{year}</ArtworkYear>
				<ArtistContainer>
					<Link href={`/artist/${artist._id}`} passHref>
						<ArtistImageContainer>
							<ImageCover
								images={artist.images}
								sizes={artistImageSizes}
								alt='artist'
							/>
						</ArtistImageContainer>
					</Link>
					<Link href={`/artist/${artist._id}`} passHref>
						<ArtistName>{artist.name}</ArtistName>
					</Link>
				</ArtistContainer>
				<ArtworkDescription>{description}</ArtworkDescription>
			</DescriptionContainer>
		</Canvas>
	);
};

const Canvas = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	max-width: 48rem;
	margin: 0 auto;
	margin-top: 0.5rem;
	box-shadow: 0 1px 20px 0 rgb(0 0 0 / 10%);
	border-radius: var(--rounded-3xl);
	overflow: hidden;

	@media ${breakpoints.lg} {
		max-width: 64rem;
		margin-top: 1rem;
		flex-direction: ${(props) => (props.portrait ? 'row' : 'column')};
		padding: 1.5rem;
	}
`;

const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	padding: 1rem 2rem 2rem;

	@media ${breakpoints.lg} {
		padding: 1rem 2rem 0;
	}
`;

const ArtworkImage = styled(ResponsiveImage)`
	object-fit: cover;
	width: 100%;

	@media ${breakpoints.lg} {
		object-fit: contain;
		align-self: flex-start;
		margin: 0 auto;
		width: ${(props) => (props.portrait ? 'auto' : '100%')};
		max-width: ${(props) => (props.portrait ? '38rem' : '')};
		max-height: 75vh;
		border-radius: var(--rounded-2xl);
	}
`;
const ArtworkTitle = styled.h1`
	font-size: var(--text-2xl);
	line-height: 1;
	text-align: center;

	@media ${breakpoints.lg} {
		font-size: var(--text-4xl);
	}
`;
const ArtworkYear = styled.h3`
	font-family: var(--font-secondary);
	font-size: var(--text-base);
	margin: 0.25rem 0;

	@media ${breakpoints.lg} {
		font-size: var(--text-lg);
		margin: 0.5rem 0;
	}
`;
const ArtworkDescription = styled.p`
	font-family: var(--font-secondary);
	font-size: var(--text-sm);
	margin-top: 0.5rem;

	@media ${breakpoints.lg} {
		font-size: var(--text-base);
		margin-top: 1rem;
		max-width: 38rem;
	}
`;

const ArtistContainer = styled.div`
	display: flex;
	justify-items: center;
	align-items: center;
`;
const ArtistImageContainer = styled.a`
	width: 2rem;
	height: 2rem;
	border-radius: var(--rounded-full);
	overflow: hidden;
	cursor: pointer;

	@media ${breakpoints.lg} {
		width: 3rem;
		height: 3rem;
	}
`;
const ArtistName = styled.a`
	font-family: var(--font-secondary);
	font-size: var(--text-base);
	line-height: 1;
	margin-left: 0.5rem;

	@media ${breakpoints.lg} {
		font-size: var(--text-lg);
	}
`;

export default ArtworkCanvas;
