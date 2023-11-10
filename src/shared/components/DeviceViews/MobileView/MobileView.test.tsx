import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { MobileView } from './MobileView';

const elements = (
	<div>
		<div>Usual div</div>
		<MobileView>
			<div>div in MobileView</div>
		</MobileView>
	</div>
);

describe('MobileView.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Component is rendered', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));

		componentRender(elements);
		expect(screen.getByText('Usual div')).toBeInTheDocument();
	});

	test('MobileView in DOM', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
		}));

		componentRender(elements);

		expect(screen.getByText('Usual div')).toBeInTheDocument();
		expect(screen.getByText('div in MobileView')).toBeInTheDocument();
	});

	test('MobileView is not in DOM', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
		}));

		componentRender(elements);

		expect(screen.getByText('Usual div')).toBeInTheDocument();
		expect(screen.queryByText('div in MobileView')).toBeNull();
	});
});
