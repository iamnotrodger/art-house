import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import Blur from '../elements/Blur';
import breakpoints from '../utils/breakpoints';
import NavLink from './NavLink';
import SearchInput from './SearchInput';

const Nav = ({ className }) => {
	const [active, setActive] = useState(false);
	const [blurActive, setBlurActive] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const onScroll = () => {
			if (window.pageYOffset > 0) {
				setActive(true);
			} else {
				setActive(false);
			}
		};
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [active]);

	return (
		<Fragment>
			<Blur active={blurActive} />
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
				<SearchInput setActive={setBlurActive} placeholder='Search' />
			</NavContainer>
		</Fragment>
	);
};

const NavContainer = styled.nav`
	display: flex;
	position: sticky;
	z-index: 50;
	top: 0;
	padding: 0.5rem;
	background: var(--color-light);
	box-shadow: ${(props) => (props.active ? 'var(--shadow-md)' : 'none')};

	@media ${breakpoints.md} {
		padding: 0.75rem;
		padding: 1rem;
	}
`;

export default Nav;
