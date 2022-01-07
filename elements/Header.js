import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.h1`
	font-size: var(--text-2xl);
	font-weight: var(--font-bold);
	line-height: 1.1;
	margin-bottom: 0.5rem;

	@media ${breakpoints.md} {
		font-size: var(--text-6xl);
	}
`;
