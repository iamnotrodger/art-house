import Head from 'next/head';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getExhibitions } from '../../api/ExhibitionAPI';
import ExhibitionList from '../../components/ExhibitionList';
import Title from '../../elements/Title';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { parseError } from '../../utils/error';
import Error from '../_error';

let cursor = 0;
const defaultExhibitionsLimit = 20;

const ExhibitionExplorePage = ({ value, error }) => {
	const fetchExhibition = ({ pageParam = 0 }) => {
		cursor += pageParam;
		return getExhibitions({
			skip: cursor,
			limit: process.env.EXHIBITIONS_LIMIT || defaultExhibitionsLimit,
		});
	};

	const endScrollRef = useRef();
	const [errorState, setErrorState] = useState(error);
	const { data, hasNextPage, fetchNextPage, ...query } = useInfiniteQuery(
		'exhibitions',
		fetchExhibition,
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

	try {
		const exhibitions = await getExhibitions({
			limit: process.env.EXHIBITIONS_LIMIT || defaultExhibitionsLimit,
		});
		return {
			props: {
				value: exhibitions,
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

export default ExhibitionExplorePage;
