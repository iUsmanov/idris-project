import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
import { memo } from 'react';

export const RootLayout = memo(() => {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</StoreProvider>
		</ErrorBoundary>
	);
});
