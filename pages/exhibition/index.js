import Head from 'next/head';
import { Fragment, useRef } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getExhibitions } from '../../api/ExhibitionAPI';
import ExhibitionList from '../../components/ExhibitionList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { getCursor } from '../../utils/cursor';
import { parseError } from '../../utils/error';
import Error from '../_error';

const limit = process.env.EXHIBITIONS_LIMIT || 15;

const ExhibitionExplorePage = () => {
	const fetchExhibition = ({ pageParam = 0 }) => {
		return getExhibitions({
			skip: pageParam,
			limit,
		});
	};

	const endScrollRef = useRef();
	const { data, error, hasNextPage, fetchNextPage } = useInfiniteQuery(
		'exhibitions',
		fetchExhibition,
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
				<title>Explore Exhibitions</title>
			</Head>
			<Title>Exhibitions</Title>
			<ExhibitionList items={data.pages.flat()} />
			<div ref={endScrollRef}></div>
		</Fragment>
	);
};

export const getServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery('exhibitions', async () => {
		const exhibitions = await getExhibitions({ limit });
		return {
			pages: [exhibitions],
		};
	});
	return { props: { dehydratedState: dehydrate(queryClient) } };
};

export default ExhibitionExplorePage;
