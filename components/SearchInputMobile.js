import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Blur from '../elements/Blur';
import SearchInput from './SearchInput';

const SearchInputMobile = () => {
	const [active, setActive] = useState(false);

	return (
		<Fragment>
			<Blur active={active} />
			<Container>
				<SearchInput setActive={setActive} />
			</Container>
		</Fragment>
	);
};

const Container = styled.div`
	position: relative;
	z-index: 50;
	background: var(--color-light);
	padding: 0.5rem 0.75rem;
`;

export default SearchInputMobile;
