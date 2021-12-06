import Link from 'next/link';
import styled, { css } from 'styled-components';
import breakpoints from '../utils/breakpoints';

const NavLink = ({ to, className, active = false, children }) => {
	return (
		<Link href={to} passHref>
			<NavLinkContainer active={active} className={className}>
				{children}
			</NavLinkContainer>
		</Link>
	);
};

const NavLinkContainer = styled.a`
	display: block;
	font-family: var(--font-secondary);
	font-weight: var(--font-bold);
	font-size: var(--text-sm);
	letter-spacing: 0.05em;
	padding: 0.5rem;
	border-radius: var(--rounded-full);
	transition: var(--transition);
	transition-property: background-color;

	${(props) =>
		props.active
			? css`
					color: var(--color-light);
					background: var(--color-dark);
			  `
			: css`
					color: var(--color-dark);
					background: var(--color-light);

					&:hover {
						background: var(--color-gray-200);
					}
			  `}

	@media ${breakpoints.md} {
		font-size: var(--text-base);
		box-shadow: none;
	}

	@media ${breakpoints.lg} {
		padding: 1rem;
		font-size: var(--text-lg);
	}
`;

export default NavLink;
