import styled from 'styled-components';

export default styled.div`
	display: ${(props) => (props.active ? 'block' : 'none')};
	position: fixed;
	z-index: 40;
	top: 0px;
	right: 0px;
	bottom: 0px;
	left: 0px;
	background: ${(props) => props.color || '#000'};
	opacity: ${(props) => props.opacity || 0.5};
`;
