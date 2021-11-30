import Head from 'next/head';
import { Fragment } from 'react';
import ErrorContainer from '../elements/ErrorContainer';
import ErrorDescription from '../elements/ErrorDescription';
import ErrorTitle from '../elements/ErrorTitle';

const Custom404 = () => {
	return (
		<Fragment>
			<Head>
				<title>404 Not Found</title>
			</Head>
			<ErrorContainer>
				<ErrorTitle>404</ErrorTitle>
				<ErrorDescription>
					Oh oh! Something&lsquo;s missing.
				</ErrorDescription>
			</ErrorContainer>
		</Fragment>
	);
};

export default Custom404;
