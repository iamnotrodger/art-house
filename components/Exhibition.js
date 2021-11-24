import Link from 'next/link';
import styled from 'styled-components';
import ImageCover from '../elements/ImageCover';
import LineClamp from '../elements/LineClamp';
import breakpoints from '../utils/breakpoints';

const defaultImageSizes = `${breakpoints.sm} 224px, ${breakpoints.lg} 288px, 160px`;

const Exhibition = ({ value = {}, imageSizes = defaultImageSizes }) => {
	const { _id, name, images } = value;

	return (
		<Link href={`/exhibition/${_id}`} passHref>
			<ExhibitionLink>
				<ImageCover
					images={images}
					sizes={imageSizes}
					alt='exhibition'
				/>
				<Name>
					<LineClamp>{name}</LineClamp>
				</Name>
			</ExhibitionLink>
		</Link>
	);
};

const ExhibitionLink = styled.a`
	position: relative;
	display: block;
	overflow: hidden;
	height: 7rem;
	line-height: 1.2;
	border-radius: var(--rounded-xl);
	transition: var(--transition);
	transition-property: filter;
	background: var(--color-dark);

	&:hover {
		filter: brightness(0.75);
	}

	@media ${breakpoints.sm} {
		height: 9rem;
	}

	@media ${breakpoints.lg} {
		height: 12rem;
	}
`;

const Name = styled.div`
	position: absolute;
	bottom: 0.5rem;
	right: 1rem;
	color: var(--color-light);
	font-size: var(--text-xl);
	font-weight: var(--font-bold);
	text-align: right;

	@media ${breakpoints.sm} {
		font-size: var(--text-2xl);
	}

	@media ${breakpoints.lg} {
		font-size: var(--text-4xl);
	}
`;

export default Exhibition;
