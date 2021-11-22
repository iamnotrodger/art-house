import { createContext, useContext } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const WindowSizeContext = createContext();

export const WindowSizeProvider = ({ children }) => {
	const windowSize = useWindowSize();

	return (
		<WindowSizeContext.Provider value={windowSize}>
			{children}
		</WindowSizeContext.Provider>
	);
};

const useWindowSizeContext = () => {
	const context = useContext(WindowSizeContext);
	if (context === undefined) {
		throw new Error(
			'useWindowSize must be used within a WindowSizeProvider'
		);
	}
	return context;
};

export default useWindowSizeContext;
