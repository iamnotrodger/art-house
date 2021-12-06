import useWindowSizeContext from '../contexts/WindowSizeContext';
import { size } from '../utils/breakpoints';
import NavMobileLayout from './NavMobileLayout';
import Nav from './Nav';

const NavLayout = () => {
	const { width } = useWindowSizeContext();

	return width < size.md ? <NavMobileLayout /> : <Nav />;
};

export default NavLayout;
