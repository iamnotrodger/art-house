import Head from 'next/head';
import { Fragment } from 'react';
import {
	dehydrate,
	QueryClient,
	useInfiniteQuery,
	useQuery,
} from 'react-query';
import { getArtist, getArtistArtworks } from '../../api/ArtistAPI';
import ArtistHeader from '../../components/ArtistHeader';
import ArtworkList from '../../components/ArtworkList';
import { getCursor } from '../../utils/cursor';
import { getSmallestImage } from '../../utils/image';
import Error from '../_error';

const limit = process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15;

const ArtistPage = ({ id }) => {
	const fetchArtworks = ({ pageParam = 0 }) => {
		return getArtistArtworks(id, {
			skip: pageParam,
			limit,
		});
	};

	const {
		data: artist,
		error: artistError,
		isFetching: isFetchingArtist,
	} = useQuery(['artist', id], () => getArtist(id), {
		staleTime: 60 * 1000,
		retry: (failureCount, error) => {
			if (error.statusCode >= 500) return true;
			return false;
		},
	});
	const {
		data: artworks,
		error: artworksError,
		fetchNextPage,
	} = useInfiniteQuery(['artist-artworks', id], fetchArtworks, {
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.length > 0) return getCursor(pages);
			return undefined;
		},
		enabled: false,
		staleTime: 60 * 1000,
	});

	if (artistError) return <Error {...parseError(artistError)} />;
	if (artworksError) return <Error {...parseError(artistError)} />;
	if (isFetchingArtist || !artist) {
		return <Fragment></Fragment>;
	}

	const metaImgURL = getSmallestImage(artist.images).url;
	const metaURL = `${process.env.NEXT_PUBLIC_API_URL}/artist/${id}`;
	const metaSiteName = process.env.NEXT_PUBLIC_SITE_NAME;
	const description = `Artworks by ${artist.name}`;

	return (
		<Fragment>
			<Head>
				<title>{artist.name}</title>
				<meta name='description' content={description} />

				<meta property='og:title' content={artist.name} />
				<meta property='og:type' content='article' />
				<meta property='og:image' content={metaImgURL} />
				<meta property='og:url' content={metaURL} />
				<meta property='og:description' content={description} />
				<meta property='og:site_name' content={metaSiteName} />
			</Head>
			<ArtistHeader value={artist} />
			<ArtworkList
				items={artworks.pages.flat()}
				loadItems={fetchNextPage}
			/>
		</Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const queryClient = new QueryClient();
	const { id } = query;

	await queryClient.prefetchQuery(['artist', id], () => getArtist(id));
	await queryClient.prefetchQuery(['artist-artworks', id], async () => {
		const artworks = await getArtistArtworks(id, {
			limit,
		});
		return {
			pages: [artworks],
		};
	});
	return { props: { dehydratedState: dehydrate(queryClient), id } };
};

export default ArtistPage;
