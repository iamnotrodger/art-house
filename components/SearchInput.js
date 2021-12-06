import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSearch from '../contexts/SearchContext';
import SearchIcon from '../icons/SearchIcon';
import breakpoints from '../utils/breakpoints';

const SearchInput = ({ setActive, placeholder = 'Search', className }) => {
	const [searchInput, setSearchInput] = useState('');
	const { search, setSearch } = useSearch();
	const router = useRouter();

	useEffect(() => {
		setSearchInput(search);
	}, [search]);

	const handleSearchChange = (event) => {
		setSearchInput(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (searchInput) {
			searchInput.trim();
			setSearch(searchInput);
			router.push(`/search?q=${searchInput}`);
		}

		if (setActive) setActive(false);
	};

	const handleFocus = () => {
		if (setActive) setActive(true);
	};

	const handleBlur = () => {
		if (setActive) setActive(false);
	};

	return (
		<SearchForm onSubmit={handleSubmit} className={className}>
			<Icon />
			<SearchInputElement
				type='text'
				value={searchInput}
				onChange={handleSearchChange}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</SearchForm>
	);
};

const SearchForm = styled.form`
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;
	margin: 0 0.5rem;
	color: var(--color-gray-500);
`;

const SearchInputElement = styled.input`
	width: 100%;
	padding: 0.5rem;
	padding-left: 1.75rem;
	border-radius: var(--rounded-full);
	font-family: var(--font-secondary);
	font-size: var(--text-sm);
	background-color: var(--color-gray-200);
	transition: var(--transition);
	transition-property: background-color, box-shadow;

	&:hover {
		background-color: var(--color-gray-300);
	}

	&:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px,
			rgba(59, 130, 246, 0.5) 0px 0px 0px 6px,
			rgba(0, 0, 0, 0) 0px 0px 0px 0px;
	}

	@media ${breakpoints.md} {
		padding: 0.75rem;
		padding-left: 1.75rem;
		font-size: var(--text-base);
	}

	@media ${breakpoints.lg} {
		padding: 1rem;
		padding-left: 2.25rem;
		font-size: var(--text-lg);
	}
`;

const Icon = styled(SearchIcon)`
	position: absolute;
	top: 50%;
	left: 0.6rem;
	transform: translateY(-50%);
	width: var(--text-base);
	height: var(--text-base);

	@media ${breakpoints.lg} {
		left: 0.75rem;
		width: var(--text-xl);
		height: var(--text-xl);
	}
`;

export default SearchInput;
