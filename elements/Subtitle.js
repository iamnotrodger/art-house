import styled from 'styled-components';
import breakpoints from '../utils/breakpoints';

export default styled.h2`
	font-family: var(--font-secondary);
	font-size: var(--text-base);

	@media ${breakpoints.md} {
		font-size: var(--text-xl);
	}
`;
