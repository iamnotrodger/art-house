import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.h1`
	font-family: var(--font-secondary);
	font-size: 8rem;
	font-weight: var(--font-bold);
	line-height: 1;

	@media ${breakpoints.md} {
		font-size: 14rem;
	}

	@media ${breakpoints.lg} {
		font-size: 16rem;
	}
`;
