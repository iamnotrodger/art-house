import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';
import Artist from './Artist';

const ArtistList = ({ items = [] }) => {
	return (
		<List>
			{items.map((artist, i) => (
				<Artist key={i} value={artist} />
			))}
		</List>
	);
};

const List = styled.div`
	--artist-width: 150px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(var(--artist-width), 1fr));
	gap: 0.75rem;

	@media ${breakpoints.md} {
		gap: 1.5rem;
	}

	@media ${breakpoints.lg} {
		--artist-width: 200px;
	}
`;

export default ArtistList;
