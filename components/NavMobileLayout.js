import { Fragment } from 'react';
import useScrollDown from '../hooks/useScrollDown';
import NavMobile from './NavMobile';
import TabBar from './TabBar';

const NavMobileLayout = () => {
	const isScrollingDown = useScrollDown();

	return (
		<Fragment>
			<NavMobile active={!isScrollingDown} />
			<TabBar active={!isScrollingDown} />
		</Fragment>
	);
};

export default NavMobileLayout;
