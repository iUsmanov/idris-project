import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
import { Suspense, memo } from 'react';

export const RootLayout = memo(() => {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<ThemeProvider>
					<Suspense>
						<App />
					</Suspense>
				</ThemeProvider>
			</StoreProvider>
		</ErrorBoundary>
	);
});
