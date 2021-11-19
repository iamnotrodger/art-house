import Link from 'next/link';
import styled from 'styled-components';
import ResponsiveImage from './ResponsiveImage';
import ImageCover from '../elements/ImageCover';
import LineClamp from '../elements/LineClamp';
import breakpoints from '../utils/breakpoints';

const defaultImageSizes = `${breakpoints.sm} 200px, ${breakpoints.md} 350px, 250px`;
const defaultArtistImageSizes = `${breakpoints.sm} 24px, 40px`;

const Artwork = ({
	value = {},
	className = '',
	imageSizes = defaultImageSizes,
	artistImageSizes = defaultArtistImageSizes,
}) => {
	const { _id, title, images, artist } = value;

	return (
		<Container className={className}>
			<Link href={`/artwork/${_id}`} passHref>
				<ArtworkImageLink>
					<ArtworkImage
						images={images}
						sizes={imageSizes}
						alt='artwork'
					/>
				</ArtworkImageLink>
			</Link>

			<ArtworkInfo>
				<Link href={`/artist/${artist._id}`} passHref>
					<ArtistLink>
						<ImageCover
							images={artist.images}
							sizes={artistImageSizes}
							alt='artist'
						/>
					</ArtistLink>
				</Link>

				<ArtworkDetails>
					<Link href={`/artwork/${_id}`} passHref>
						<ArtworkTitle>
							<LineClamp>{title}</LineClamp>
						</ArtworkTitle>
					</Link>
					<Link href={`/artist/${artist._id}`} passHref>
						<ArtistName>
							<LineClamp>{artist.name}</LineClamp>
						</ArtistName>
					</Link>
				</ArtworkDetails>
			</ArtworkInfo>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const ArtworkImageLink = styled.a`
	display: block;
	overflow: hidden;
	cursor: pointer;
	border-radius: var(--rounded-2xl);
	transition: var(--transition);
	transition-property: filter;

	&:hover {
		filter: brightness(0.75);
	}
`;
const ArtworkImage = styled(ResponsiveImage)`
	width: 100%;
	object-fit: cover;
`;
const ArtworkInfo = styled.div`
	display: flex;
	align-items: flex-start;
	padding-top: 0.5rem;
	padding-left: 0.5rem;
`;
const ArtworkDetails = styled.div`
	margin-left: 0.5rem;
	line-height: 1.2;
	max-width: 75%;
`;
const ArtworkTitle = styled.a`
	display: block;
	font-size: var(--text-xs);
	font-weight: var(--font-bold);
	cursor: pointer;

	@media ${breakpoints.sm} {
		font-size: var(--text-lg);
	}
`;

const ArtistLink = styled.a`
	display: block;
	overflow: hidden;
	cursor: pointer;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: var(--rounded-full);

	@media ${breakpoints.sm} {
		width: 2.5rem;
		height: 2.5rem;
	}
`;
const ArtistName = styled.a`
	display: block;
	font-size: var(--text-xs);
	font-family: var(--font-secondary);

	&:hover {
		text-decoration: underline;
	}

	@media ${breakpoints.sm} {
		font-size: var(--text-base);
	}
`;

export default Artwork;
