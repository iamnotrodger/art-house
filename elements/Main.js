import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.main`
	padding: 0 0.5rem 1rem;

	@media ${breakpoints.md} {
		padding: 0 2rem 2rem;
	}

	@media ${breakpoints.lg} {
		padding: 0 4rem 4rem;
	}
`;
