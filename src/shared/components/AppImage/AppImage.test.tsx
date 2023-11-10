import { screen, waitFor } from '@testing-library/react';
import { AppImage } from './AppImage';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

class FakeImageSuccess {
	onload?: () => void;
	constructor() {
		setTimeout(() => {
			this.onload && this.onload(); // simulate success
		}, 100);
	}
}

class FakeImageError {
	onerror?: () => void;
	constructor() {
		setTimeout(() => {
			this.onerror && this.onerror(); // simulate error
		}, 100);
	}
}

const errorFallback = <div data-testid={'ErrorFallback'}>Error</div>;
const loadingFallback = <div data-testid={'LoadingFallback'}>Loading</div>;
const orgImage = window.Image;

describe('AppImage', () => {
	afterEach(() => {
		window.Image = orgImage;
	});

	test('Component is rendered', () => {
		componentRender(<AppImage />);

		expect(screen.getByTestId('AppImage')).toBeInTheDocument();
	});

	test('Image successfully loaded', async () => {
		window.Image = FakeImageSuccess as any;
		componentRender(
			<AppImage src={'test.jpg'} errorFallback={errorFallback} loadingFallback={loadingFallback} />
		);

		await waitFor(() => {
			expect(screen.queryByTestId('LoadingFallback')).toBeNull();
			expect(screen.queryByTestId('ErrorFallback')).toBeNull();
			expect(screen.getByTestId('AppImage')).toBeInTheDocument();
		});
	});

	test('It`s throwed error', async () => {
		window.Image = FakeImageError as any;
		componentRender(
			<AppImage src={'test.jpg'} errorFallback={errorFallback} loadingFallback={loadingFallback} />
		);

		await waitFor(() => {
			expect(screen.queryByTestId('LoadingFallback')).toBeNull();
			expect(screen.queryByTestId('AppImage')).toBeNull();
			expect(screen.getByTestId('ErrorFallback')).toBeInTheDocument();
		});
	});

	test('Loading', async () => {
		componentRender(
			<AppImage src={'test.jpg'} errorFallback={errorFallback} loadingFallback={loadingFallback} />
		);

		expect(screen.queryByTestId('ErrorFallback')).toBeNull();
		expect(screen.queryByTestId('AppImage')).toBeNull();
		expect(screen.getByTestId('LoadingFallback')).toBeInTheDocument();
	});
});

// test('Component renders', () => {
// 	componentRender(<AppImage />);
// 	expect(screen.getByTestId('image')).toBeInTheDocument();
// });
// test('Component renders', async () => {
// 	componentRender(
// 		<AppImage
// 			src={'test.jpg'}
// 			errorFallback={<div>Error</div>}
// 			loadingFallback={<div>Loading</div>}
// 		/>
// 	);
// 	screen.debug();
// 	await waitFor(() => {
// 		expect(screen.getByTestId('image')).toBeInTheDocument();
// 	});
// });
