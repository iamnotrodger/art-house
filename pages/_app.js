import 'gestalt/dist/gestalt.css';
import { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavLayout from '../components/NavLayout';
import { SearchProvider } from '../contexts/SearchContext';
import { WindowSizeProvider } from '../contexts/WindowSizeContext';
import Main from '../elements/Main';
import '../styles/globals.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<QueryClientProvider client={queryClient}>
				<WindowSizeProvider>
					<SearchProvider>
						<NavLayout />
						<Main>
							<Component {...pageProps} />
						</Main>
					</SearchProvider>
				</WindowSizeProvider>
			</QueryClientProvider>
		</Fragment>
	);
};

export default MyApp;
