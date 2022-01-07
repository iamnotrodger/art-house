import Link from 'next/link';
import styled from 'styled-components';
import ImageCover from '../elements/ImageCover';
import LineClamp from '../elements/LineClamp';
import breakpoints from '../utils/breakpoints';

const defaultImageSizes = `${breakpoints.lg} 144px, 122px`;

const Artist = ({ value = {}, imageSizes = defaultImageSizes }) => {
	const { _id, name, images } = value;

	return (
		<Link href={`/artist/${_id}`} passHref>
			<ArtistLink>
				<ImageContainer>
					<ImageCover
						images={images}
						sizes={imageSizes}
						alt='artist'
					/>
				</ImageContainer>
				<Info>
					<Name>
						<LineClamp>{name}</LineClamp>
					</Name>
					<Title>Artist</Title>
				</Info>
			</ArtistLink>
		</Link>
	);
};

const ArtistLink = styled.a`
	display: flex;
	align-items: center;
	flex-direction: column;
	height: 100%;
	border-radius: var(--rounded-xl);
	transition: var(--transition);
	transition-property: background-color;

	&:hover {
		background-color: var(--color-gray-100);
	}

	@media ${breakpoints.md} {
		padding: 2rem;
		background-color: var(--color-light);
		box-shadow: var(--shadow);
	}
`;

const ImageContainer = styled.div`
	width: 7rem;
	height: 7rem;
	overflow: hidden;
	border-radius: var(--rounded-full);

	@media ${breakpoints.lg} {
		width: 9rem;
		height: 9rem;
	}
`;

const Info = styled.div`
	margin-top: 0.5rem;
	text-align: center;

	@media ${breakpoints.md} {
		margin-top: 1.5rem;
		text-align: start;
		align-self: flex-start;
	}
`;

const Name = styled.div`
	font-size: var(--text-sm);
	font-weight: var(--font-bold);
	line-height: 1.2;

	@media ${breakpoints.md} {
		font-size: var(--text-base);
	}

	@media ${breakpoints.lg} {
		font-size: var(--text-lg);
	}
`;

const Title = styled.div`
	font-family: var(--font-secondary);
	font-size: var(--text-xs);

	@media ${breakpoints.md} {
		font-size: var(--text-sm);
	}

	@media ${breakpoints.lg} {
		font-size: var(--text-base);
	}
`;

export default Artist;
