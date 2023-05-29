import { FC } from 'react';
import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
interface RootLayoutProps {}

export const RootLayout: FC<RootLayoutProps> = (props) => {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</StoreProvider>
		</ErrorBoundary>
	);
};
