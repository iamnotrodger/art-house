import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.h1`
	font-size: var(--text-2xl);
	font-weight: var(--font-bold);

	@media ${breakpoints.md} {
		font-size: var(--text-6xl);
	}

	@media ${breakpoints.lg} {
		font-size: var(--text-8xl);
	}
`;
