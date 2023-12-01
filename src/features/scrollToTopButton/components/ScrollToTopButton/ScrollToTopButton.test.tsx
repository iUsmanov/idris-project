import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ScrollToTopButton } from './ScrollToTopButton';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { screen } from '@testing-library/react';

describe('ScrollToTopButton.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<ScrollToTopButton />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ScrollToTopButton')).toBeInTheDocument();
	});
	// test('Drawer is opened', async () => {
	// 	await componentRender(<ScrollToTopButton />, {
	// 		wrapInAct: true,
	// 	});

	// 	document.body.scrollTop = 50;
	// 	// expect(document.body.scrollTop).toBe(50); IT IS TRUE

	// 	await userEvent.click(screen.getByTestId('ScrollToTopButton'));

	// 	await waitFor(() => {
	// 		expect(document.body.scrollTop).toBe(0);
	// 	});
	// });
});

// function delay() {
// 	return new Promise<void>((resolve) => {
// 		setTimeout(() => {
// 			resolve();
// 		}, 2000);
// 	});
// }
