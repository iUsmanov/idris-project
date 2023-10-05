import { App } from './App';
import { ThemeProvider } from './providers/ThemeProvider';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
import { Suspense, memo } from 'react';
import { ForceUpdateProvider } from '@/shared/render/ForceUpdateProvider/ForceUpdateProvider';

export const RootLayout = memo(() => {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<ForceUpdateProvider>
					<ThemeProvider>
						<Suspense>
							<App />
						</Suspense>
					</ThemeProvider>
				</ForceUpdateProvider>
			</StoreProvider>
		</ErrorBoundary>
	);
});
