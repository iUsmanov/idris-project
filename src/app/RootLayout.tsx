import { App } from './App';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { StoreProvider } from './providers/StoreProvider';
import { Suspense, memo } from 'react';
import { ForceUpdateProvider } from '@/shared/render/ForceUpdateProvider/ForceUpdateProvider';

export const RootLayout = memo(() => {
	return (
		<ErrorBoundary>
			<StoreProvider>
				<ForceUpdateProvider>
					<Suspense>
						<App />
					</Suspense>
				</ForceUpdateProvider>
			</StoreProvider>
		</ErrorBoundary>
	);
});
