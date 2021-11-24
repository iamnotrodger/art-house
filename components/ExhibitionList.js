import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';
import Exhibition from './Exhibition';

const ExhibitionList = ({ items = [] }) => {
	return (
		<List>
			{items.map((exhibition, i) => (
				<Exhibition key={i} value={exhibition} />
			))}
		</List>
	);
};

const List = styled.div`
	--exhibit-width: 10rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(var(--exhibit-width), 1fr));
	gap: 0.75rem;

	@media ${breakpoints.sm} {
		--exhibit-width: 14rem;
	}

	@media ${breakpoints.lg} {
		--exhibit-width: 18rem;
		gap: 1.5rem;
	}
`;

export default ExhibitionList;
