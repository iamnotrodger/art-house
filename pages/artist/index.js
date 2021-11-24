import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getArtists } from '../../api/ArtistAPI';
import ArtistList from '../../components/ArtistList';
import InfiniteScrollStyled from '../../elements/InfiniteScrollStyled';
import MaxWidthContainer from '../../elements/MaxWidthContainer';
import Title from '../../elements/Title';
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
	const [errorState, setErrorState] = useState(error);

	useEffect(() => {
		if (query.error) {
			setErrorState(query.error);
		}
	}, [query.error]);

	if (errorState) return <Error {...errorState} />;
	const artists = data.pages.flat();
	return (
		<Fragment>
			<Head>
				<title>Explore Artists</title>
			</Head>
			<MaxWidthContainer>
				<Title>Artists</Title>
				<InfiniteScrollStyled
					dataLength={artists.length}
					next={fetchNextPage}
					hasMore={hasNextPage}
				>
					<ArtistList items={artists} />
				</InfiniteScrollStyled>
			</MaxWidthContainer>
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
