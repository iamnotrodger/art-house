import { Fragment } from 'react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<Component {...pageProps} />
		</Fragment>
	);
};

export default MyApp;
