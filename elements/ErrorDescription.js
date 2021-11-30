import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.p`
	font-size: var(--text-base);
	font-weight: var(--font-bold);

	@media ${breakpoints.md} {
		font-size: var(--text-xl);
	}

	@media ${breakpoints.lg} {
		font-size: var(--text-2xl);
	}
`;
