import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import useSearch from '../contexts/SearchContext';
import HomeIcon from '../icons/HomeIcon';
import SearchIcon from '../icons/SearchIcon';
import breakpoints from '../utils/breakpoints';
import NavLink from './NavLink';

const TabBar = ({ active, className }) => {
	const router = useRouter();
	const { search } = useSearch();
	const searchQuery = search ? `?q=${search}` : '';

	return (
		<Bar active={active} className={className}>
			<NavLink to='/' active={'/' === router.pathname}>
				<HomeIcon height='1' width='1' />
			</NavLink>
			<NavLink
				to={`/search${searchQuery}`}
				active={'/search' === router.pathname}
			>
				<SearchIcon height='1' width='1' />
			</NavLink>
		</Bar>
	);
};

const Bar = styled.div`
	display: flex;
	position: fixed;
	z-index: 50;
	gap: 0.5rem;
	bottom: 1rem;
	left: 50%;
	padding: 0.5rem 1rem;
	background: var(--color-light);
	border-radius: var(--rounded-full);
	box-shadow: var(--shadow-md);
	transition: var(--transition);
	transition-duration: 250ms;

	${(props) =>
		props.active
			? css`
					opacity: 1;
					transform: translate(-50%, 0);
			  `
			: css`
					opacity: 0;
					transform: translate(-50%, 175%);
			  `}

	@media ${breakpoints.md} {
		display: none;
	}
`;

export default TabBar;
