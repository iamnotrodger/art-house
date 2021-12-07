import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from 'react-query';
import { getExhibitions } from '../../api/ExhibitionAPI';
import ExhibitionList from '../../components/ExhibitionList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { parseError } from '../../utils/error';
import Error from '../_error';

let cursor = 0;
const limit = process.env.EXHIBITIONS_LIMIT || 15;

const ExhibitionExplorePage = ({ error }) => {
	const fetchExhibition = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getExhibitions({
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
	} = useInfiniteQuery('exhibitions', fetchExhibition, {
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

	const exhibitions = data.pages.flat();

	return (
		<Fragment>
			<Head>
				<title>Explore Exhibitions</title>
			</Head>
			<Title>Exhibitions</Title>
			<ExhibitionList items={exhibitions} />
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
		await queryClient.prefetchQuery('exhibitions', async () => {
			const exhibitions = await getExhibitions({ limit });
			return {
				pages: [exhibitions],
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

export default ExhibitionExplorePage;
