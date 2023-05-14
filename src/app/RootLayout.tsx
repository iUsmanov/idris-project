import { FC } from 'react';
import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
interface RootLayoutProps {}

export const RootLayout: FC<RootLayoutProps> = (props) => {
	return (
		<ErrorBoundary>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ErrorBoundary>
	);
};
