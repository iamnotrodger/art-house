import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getArtists } from '../../api/ArtistAPI';
import ArtistList from '../../components/ArtistList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { parseError } from '../../utils/error';
import Error from '../_error';

let cursor = 0;
const defaultArtistsLimit = 20;

const ArtistExplorePage = ({ value, error }) => {
	const fetchArtists = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getArtists({
			skip: cursor,
			limit: process.env.NEXT_PUBLIC_ARTISTS_LIMIT || defaultArtistsLimit,
		});
	};

	const endScrollRef = useRef();
	const [errorState, setErrorState] = useState(error);
	const { data, hasNextPage, fetchNextPage, ...query } = useInfiniteQuery(
		'artists',
		fetchArtists,
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length > 0) return lastPage.length;
				return undefined;
			},
			initialData: { pages: [value] },
			enabled: false,
		}
	);

	useEffect(() => {
		if (query.error) {
			setErrorState(query.error);
		}
	}, [query.error]);

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

	try {
		const artists = await getArtists({
			limit: process.env.NEXT_PUBLIC_ARTISTS_LIMIT || defaultArtistsLimit,
		});
		return {
			props: {
				value: artists,
			},
		};
	} catch (error) {
		return {
			props: {
				error: parseError(error),
			},
		};
	}
};

export default ArtistExplorePage;
