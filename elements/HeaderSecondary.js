import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.h2`
	font-size: var(--text-xl);
	font-weight: var(--font-bold);
	line-height: 1.1;
	margin-bottom: 0.5rem;

	@media ${breakpoints.md} {
		font-size: var(--text-2xl);
		margin-bottom: 1rem;
	}
`;
