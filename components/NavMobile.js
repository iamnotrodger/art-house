import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import NavLink from './NavLink';
import SearchInput from './SearchInput';
import SearchInputMobile from './SearchInputMobile';

const NavMobile = ({ active, className }) => {
	const router = useRouter();

	if (router.pathname === '/search') {
		return <SearchInputMobile />;
	}

	return (
		<NavContainer active={active} className={className}>
			<NavLink to='/' active={'/' === router.pathname}>
				Home
			</NavLink>
			<NavLink
				to='/exhibition'
				active={'/exhibition' === router.pathname}
			>
				Exhibitions
			</NavLink>
			<NavLink to='/artist' active={'/artist' === router.pathname}>
				Artists
			</NavLink>
		</NavContainer>
	);
};

const NavContainer = styled.nav`
	display: flex;
	justify-content: center;
	position: sticky;
	z-index: 50;
	top: 0;
	padding: 0.5rem;
	background: var(--color-light);
	transition: var(--transition);
	transition-duration: 500ms;

	${(props) =>
		props.active
			? css`
					transform: translateY(0);
			  `
			: css`
					transform: translateY(-175%);
			  `}
`;

export default NavMobile;
