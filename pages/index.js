import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { getArtworks } from '../api/ArtworkAPI';
import ArtworkList from '../components/ArtworkList';
import { parseError } from '../utils/error';
import Error from './_error';
import { useInfiniteQuery } from 'react-query';

let cursor = 0;

const HomePage = ({ value = [], error }) => {
	const fetchArtworks = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getArtworks({
			skip: cursor,
			limit: process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15,
		});
	};

	const { data, fetchNextPage, ...query } = useInfiniteQuery(
		'artworks',
		fetchArtworks,
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length > 0) return lastPage.length;
				return undefined;
			},
			initialData: { pages: [value] },
			enabled: false,
		}
	);
	const [errorState, setErrorState] = useState(error);

	useEffect(() => {
		if (query.error) {
			setErrorState(query.error);
		}
	}, [query.error]);

	if (errorState) return <Error {...errorState} />;
	return (
		<Fragment>
			<Head>
				<title>Art House</title>
				<meta name='description' content='Virtual Museum' />
			</Head>
			<ArtworkList items={data.pages.flat()} loadItems={fetchNextPage} />
		</Fragment>
	);
};

export const getServerSideProps = async ({ req, res }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=30, stale-while-revalidate=59'
	);

	try {
		const artworks = await getArtworks({
			limit: process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15,
		});
		return { props: { value: artworks } };
	} catch (error) {
		return {
			props: {
				error: parseError(error),
			},
		};
	}
};

export default HomePage;
