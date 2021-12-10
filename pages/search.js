import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getArtworks } from '../api/ArtworkAPI';
import ArtworkList from '../components/ArtworkList';
import SearchMessage from '../components/SearchMessage';
import useSearch from '../contexts/SearchContext';
import { parseError } from '../utils/error';
import Error from './_error';

let cursor = 0;
const limit = process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15;

const SearchPage = ({ search, error }) => {
	const [errorState, setErrorState] = useState(error);
	const { setSearch } = useSearch();

	const fetchArtworks = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getArtworks({
			search,
			skip: cursor,
			limit,
		});
	};

	const {
		data,
		fetchNextPage,
		error: queryError,
	} = useInfiniteQuery(['artworks', search], fetchArtworks, {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length > 0) return lastPage.length;
			return undefined;
		},
		enabled: false,
	});

	useEffect(() => {
		if (queryError) setErrorState(queryError);
	}, [queryError]);

	useEffect(() => {
		cursor = 0;
		setSearch(search);
	}, [search, setSearch]);

	if (errorState) return <Error {...errorState} />;

	const artworks = data ? data.pages.flat() : [];

	return (
		<Fragment>
			<Head>
				<title>Search &quot;{search}&quot;</title>
				<meta
					name='description'
					content={`Search results for "${search}"`}
				/>
			</Head>
			{artworks.length > 0 ? (
				<ArtworkList items={artworks} loadItems={fetchNextPage} />
			) : (
				<SearchMessage search={search} />
			)}
		</Fragment>
	);
};

export const getServerSideProps = async ({ res, query }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=59'
	);

	const queryClient = new QueryClient();
	const search = query.q || '';

	if (!search) {
		return { props: { search: '' } };
	}

	try {
		await queryClient.prefetchQuery(['artworks', search], async () => {
			const artworks = await getArtworks({ search, limit });
			return {
				pages: [artworks],
			};
		});
		return { props: { dehydratedState: dehydrate(queryClient), search } };
	} catch (error) {
		return {
			props: {
				error: parseError(error),
			},
		};
	}
};

export default SearchPage;
