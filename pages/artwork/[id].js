import Head from 'next/head';
import { Fragment } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getArtwork } from '../../api/ArtworkAPI';
import ArtworkCanvas from '../../components/ArtworkCanvas';
import { parseError } from '../../utils/error';
import { getSmallestImage } from '../../utils/image';
import Error from '../_error';

const ArtworkPage = ({ id }) => {
	const { data, error, isFetching } = useQuery(
		['artwork', id],
		() => getArtwork(id),
		{
			staleTime: 60 * 1000,
			retry: (failureCount, error) => {
				if (error.statusCode >= 500) return true;
				return false;
			},
		}
	);

	if (error) return <Error {...parseError(error)} />;
	if (isFetching || !data) return <Fragment></Fragment>;

	const metaImgURL = getSmallestImage(data.images).url;
	const metaURL = `${process.env.NEXT_PUBLIC_API_URL}/artwork/${id}`;
	const metaSiteName = process.env.NEXT_PUBLIC_SITE_NAME;

	return (
		<Fragment>
			<Head>
				<title>
					{data.title} by {data.artist.name}
				</title>
				<meta name='description' content={data.description} />

				<meta property='og:title' content={data.title} />
				<meta property='og:type' content='article' />
				<meta property='og:image' content={metaImgURL} />
				<meta property='og:url' content={metaURL} />
				<meta property='og:description' content={data.description} />
				<meta property='og:site_name' content={metaSiteName} />
			</Head>
			<ArtworkCanvas value={data} />
		</Fragment>
	);
};

export const getServerSideProps = async ({ query }) => {
	const queryClient = new QueryClient();
	const { id } = query;

	await queryClient.prefetchQuery(['artwork', id], () => getArtwork(id));
	return { props: { dehydratedState: dehydrate(queryClient), id } };
};

export default ArtworkPage;
