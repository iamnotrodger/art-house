import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.div`
	margin-bottom: 1rem;

	@media ${breakpoints.md} {
		margin-bottom: 2rem;
	}
`;
