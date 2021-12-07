import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getArtists } from '../../api/ArtistAPI';
import ArtistList from '../../components/ArtistList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { parseError } from '../../utils/error';
import Error from '../_error';

let cursor = 0;
const limit = process.env.NEXT_PUBLIC_ARTISTS_LIMIT || 20;

const ArtistExplorePage = ({ error }) => {
	const fetchArtists = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getArtists({
			skip: cursor,
			limit,
		});
	};

	const endScrollRef = useRef();
	const [errorState, setErrorState] = useState(error);
	const {
		data,
		hasNextPage,
		fetchNextPage,
		error: queryError,
	} = useInfiniteQuery('artists', fetchArtists, {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length > 0) return lastPage.length;
			return undefined;
		},
		enabled: false,
	});

	useEffect(() => {
		if (queryError) {
			setErrorState(queryError);
		}
	}, [queryError]);

	useIntersectionObserver({
		target: endScrollRef,
		onIntersect: fetchNextPage,
		enabled: hasNextPage,
	});

	if (errorState) return <Error {...errorState} />;

	const artists = data.pages.flat();

	return (
		<Fragment>
			<Head>
				<title>Explore Artists</title>
			</Head>
			<Title>Artists</Title>
			<ArtistList items={artists} />
			<div ref={endScrollRef}></div>
		</Fragment>
	);
};

export const getServerSideProps = async ({ req, res }) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=59'
	);

	const queryClient = new QueryClient();

	try {
		await queryClient.prefetchQuery('artists', async () => {
			const artists = await getArtists({ limit });
			return {
				pages: [artists],
			};
		});

		return { props: { dehydratedState: dehydrate(queryClient) } };
	} catch (error) {
		return {
			props: {
				error: parseError(error),
			},
		};
	}
};

export default ArtistExplorePage;
