import styled from 'styled-components';
import { size } from '../utils/breakpoints';

export default styled.div`
	max-width: ${(props) => (props.width ? props.width : size['3xl'])}px;
	margin: 0 auto;
`;
