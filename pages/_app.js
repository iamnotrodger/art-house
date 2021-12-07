import 'gestalt/dist/gestalt.css';
import { Fragment, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import NavLayout from '../components/NavLayout';
import { SearchProvider } from '../contexts/SearchContext';
import { WindowSizeProvider } from '../contexts/WindowSizeContext';
import Main from '../elements/Main';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<Fragment>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<WindowSizeProvider>
						<SearchProvider>
							<NavLayout />
							<Main>
								<Component {...pageProps} />
							</Main>
						</SearchProvider>
					</WindowSizeProvider>
				</Hydrate>
			</QueryClientProvider>
		</Fragment>
	);
};

export default MyApp;
