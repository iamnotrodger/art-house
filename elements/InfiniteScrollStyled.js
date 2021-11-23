import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { size } from '../utils/breakpoints';

export default styled(InfiniteScroll)`
	max-width: ${(props) => (props.width ? props.width : size['3xl'])}px;
	padding-bottom: 10px;
`;
