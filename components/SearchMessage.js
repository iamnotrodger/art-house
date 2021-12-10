import React from 'react';
import styled from 'styled-components';
import ErrorContainer from '../elements/ErrorContainer';
import ErrorDescription from '../elements/ErrorDescription';
import SearchIcon from '../icons/SearchIcon';
import breakpoints from '../utils/breakpoints';

const SearchMessage = ({ search }) => {
	const searchMessage = search
		? `Nothing found for "${search}"`
		: 'Try looking for some artworks';

	return (
		<ErrorContainer>
			<MessageContainer>
				<SearchIcon height='5' width='5' />
				<ErrorDescription>{searchMessage}</ErrorDescription>
			</MessageContainer>
		</ErrorContainer>
	);
};

const MessageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	@media ${breakpoints.md} {
		flex-direction: row;
		justify-items: center;
	}
`;

export default SearchMessage;
