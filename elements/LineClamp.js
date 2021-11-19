import styled from 'styled-components';

export default styled.span`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${(props) => props.line || 2};
	word-wrap: break-word;
	text-overflow: ellipsis;
	overflow: hidden;
`;
