import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getExhibitions } from '../../api/ExhibitionAPI';
import ExhibitionList from '../../components/ExhibitionList';
import InfiniteScrollStyled from '../../elements/InfiniteScrollStyled';
import MaxWidthContainer from '../../elements/MaxWidthContainer';
import Title from '../../elements/Title';
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
	const [errorState, setErrorState] = useState(error);

	useEffect(() => {
		if (query.error) {
			setErrorState(query.error);
		}
	}, [query.error]);

	if (errorState) return <Error {...errorState} />;
	const exhibitions = data.pages.flat();
	return (
		<Fragment>
			<Head>
				<title>Explore Exhibitions</title>
			</Head>
			<MaxWidthContainer>
				<Title>Exhibitions</Title>
				<InfiniteScrollStyled
					dataLength={exhibitions.length}
					next={fetchNextPage}
					hasMore={hasNextPage}
				>
					<ExhibitionList items={exhibitions} />
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
