import Head from 'next/head';
import { Fragment } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getArtworks } from '../api/ArtworkAPI';
import ArtworkList from '../components/ArtworkList';
import { parseError } from '../utils/error';
import Error from './_error';

let cursor = 0;
const limit = process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15;

const HomePage = () => {
	const fetchArtworks = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getArtworks({
			skip: cursor,
			limit,
		});
	};

	const { data, error, fetchNextPage } = useInfiniteQuery(
		'artworks',
		fetchArtworks,
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length > 0) return lastPage.length;
				return undefined;
			},
			enabled: false,
			staleTime: 60 * 1000,
		}
	);

	if (error) return <Error {...parseError(error)} />;
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

export const getServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('artworks', async () => {
		const artworks = await getArtworks({
			limit,
		});
		return {
			pages: [artworks],
		};
	});
	return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default HomePage;
