import Head from 'next/head';
import { Fragment } from 'react';
import ErrorContainer from '../elements/ErrorContainer';
import ErrorDescription from '../elements/ErrorDescription';
import ErrorTitle from '../elements/ErrorTitle';
import Custom404 from './404';

const Error = ({
	statusCode = 500,
	message = 'Oh oh! Something went wrong.',
}) => {
	if (statusCode == 404) {
		return <Custom404 />;
	}

	return (
		<Fragment>
			<Head>
				<title>Something went wrong</title>
			</Head>
			<ErrorContainer>
				<ErrorTitle>{statusCode}</ErrorTitle>
				<ErrorDescription>{message}</ErrorDescription>
			</ErrorContainer>
		</Fragment>
	);
};

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	const message = err.message;

	return { statusCode, message };
};

export default Error;
