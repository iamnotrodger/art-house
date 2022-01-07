import Head from 'next/head';
import { Fragment } from 'react';
import {
	dehydrate,
	QueryClient,
	useInfiniteQuery,
	useQuery,
} from 'react-query';
import {
	getExhibition,
	getExhibitionArtists,
	getExhibitionArtworks,
} from '../../api/ExhibitionAPI';
import ArtistList from '../../components/ArtistList';
import ArtworkList from '../../components/ArtworkList';
import ExhibitionHeader from '../../components/ExhibitionHeader';
import HeaderSecondary from '../../elements/HeaderSecondary';
import MarginContainer from '../../elements/MarginContainer';
import { getCursor } from '../../utils/cursor';
import { parseError } from '../../utils/error';
import { getSmallestImage } from '../../utils/image';
import Error from '../_error';

const artistLimit = process.env.NEXT_PUBLIC_ARTISTS_LIMIT || 20;
const artworkLimit = process.env.NEXT_PUBLIC_ARTWORKS_LIMIT || 15;

const ExhibitionPage = ({ id }) => {
	const fetchArtists = ({ pageParam = 0 }) => {
		return getExhibitionArtists(id, {
			skip: pageParam,
			limit: artistLimit,
		});
	};
	const fetchArtworks = ({ pageParam = 0 }) => {
		return getExhibitionArtworks(id, {
			skip: pageParam,
			limit: artworkLimit,
		});
	};

	const {
		data: exhibition,
		error: exhibitionError,
		isFetching,
	} = useQuery(['artist', id], () => getExhibition(id), {
		staleTime: 60 * 1000,
		retry: (failureCount, error) => {
			if (error.statusCode >= 500) return true;
			return false;
		},
	});
	const { data: artists } = useQuery(
		['exhibition-artists', id],
		fetchArtists,
		{
			staleTime: 60 * 1000,
			retry: (failureCount, error) => {
				if (error.statusCode >= 500) return true;
				return false;
			},
		}
	);

	const { data: artworks, fetchNextPage: fetchNextPageOfArtwork } =
		useInfiniteQuery(['exhibition-artworks', id], fetchArtworks, {
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.length > 0) return getCursor(pages);
				return undefined;
			},
			enabled: false,
			staleTime: 60 * 1000,
		});

	if (exhibitionError) return <Error {...parseError(exhibitionError)} />;
	if (isFetching || !exhibition) return <Fragment></Fragment>;

	const metaImgURL = getSmallestImage(exhibition.images).url;
	const metaURL = `${process.env.NEXT_PUBLIC_API_URL}/exhibition/${id}`;
	const metaSiteName = process.env.NEXT_PUBLIC_SITE_NAME;
	const description = `The ${exhibition.name} Exhibition`;

	return (
		<Fragment>
			<Head>
				<title>{exhibition.name}</title>
				<meta name='description' content={description} />

				<meta property='og:title' content={exhibition.name} />
				<meta property='og:type' content='article' />
				<meta property='og:image' content={metaImgURL} />
				<meta property='og:url' content={metaURL} />
				<meta property='og:description' content={description} />
				<meta property='og:site_name' content={metaSiteName} />
			</Head>
			<ExhibitionHeader value={exhibition} />
			<MarginContainer>
				<HeaderSecondary>Featured Artists</HeaderSecondary>
				<ArtistList items={artists} />
			</MarginContainer>
			<HeaderSecondary>Artworks</HeaderSecondary>
			<ArtworkList
				items={artworks.pages.flat()}
				loadItems={fetchNextPageOfArtwork}
			/>
		</Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const queryClient = new QueryClient();
	const { id } = query;

	await queryClient.prefetchQuery(['exhibition', id], () =>
		getExhibition(id)
	);
	await queryClient.prefetchQuery(['exhibition-artists', id], () =>
		getExhibitionArtists(id, {
			limit: artistLimit,
		})
	);
	await queryClient.prefetchQuery(['exhibition-artworks', id], async () => {
		const artworks = await getExhibitionArtworks(id, {
			limit: artworkLimit,
		});
		return {
			pages: [artworks],
		};
	});
	return { props: { dehydratedState: dehydrate(queryClient), id } };
};

export default ExhibitionPage;
