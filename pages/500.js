import Head from 'next/head';
import { Fragment } from 'react';
import ErrorContainer from '../elements/ErrorContainer';
import ErrorDescription from '../elements/ErrorDescription';
import ErrorTitle from '../elements/ErrorTitle';

const Custom500 = () => {
	return (
		<Fragment>
			<Head>
				<title>500 Client Side Error</title>
			</Head>
			<ErrorContainer>
				<ErrorTitle>500</ErrorTitle>
				<ErrorDescription>
					Oh oh! Something went wrong.
				</ErrorDescription>
			</ErrorContainer>
		</Fragment>
	);
};

export default Custom500;
