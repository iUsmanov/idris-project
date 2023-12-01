import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { StarRating } from './StarRating';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('StarRating.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<StarRating />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('StarRating')).toBeInTheDocument();
		expect(screen.getAllByText('mockedSVG')).toHaveLength(5);
	});
});
