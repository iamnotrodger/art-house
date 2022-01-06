import Head from 'next/head';
import { Fragment, useRef } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getArtists } from '../../api/ArtistAPI';
import ArtistList from '../../components/ArtistList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getCursor } from '../../utils/cursor';
import { parseError } from '../../utils/error';
import Error from '../_error';

const limit = process.env.NEXT_PUBLIC_ARTISTS_LIMIT || 20;

const ArtistExplorePage = () => {
	const fetchArtists = ({ pageParam = 0 }) => {
		return getArtists({
			skip: pageParam,
			limit,
		});
	};

	const endScrollRef = useRef();
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery(
		'artists',
		fetchArtists,
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length > 0) return getCursor(pages);
				return undefined;
			},
			enabled: false,
			staleTime: 60 * 1000,
		}
	);

	useIntersectionObserver({
		target: endScrollRef,
		onIntersect: fetchNextPage,
		enabled: hasNextPage,
	});

	if (error) return <Error {...parseError(error)} />;
	return (
		<Fragment>
			<Head>
				<title>Explore Artists</title>
			</Head>
			<Title>Artists</Title>
			<ArtistList items={data.pages.flat()} />
			<div ref={endScrollRef}></div>
		</Fragment>
	);
};

export const getServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('artists', async () => {
		const artists = await getArtists({ limit });
		return {
			pages: [artists],
		};
	});
	return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default ArtistExplorePage;
