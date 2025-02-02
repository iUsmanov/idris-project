import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { PageMainContent } from './PageMainContent';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

const mockOnScrollEnd = jest.fn();
const mockSetScrollPosition = jest.fn();
const children = <div style={{ height: 5000 }} data-testid='Children'></div>;
const intersectionObserverMock = () => ({
	observe: () => null,
	unobserve: () => null,
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('PageMainContent.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(<PageMainContent>{children}</PageMainContent>, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageMainContent')).toBeInTheDocument();
		expect(screen.getByTestId('Children')).toBeInTheDocument();
	});

	// test('Значение скролла достаётся из стейта и старница проскролливается до нужного места', async () => {
	// 	// TEST not works because wrapperRef is undefined
	// 	await componentRender(<PageMainContent>{children}</PageMainContent>, {
	// 		wrapInAct: true,
	// 		initialState: {
	// 			ui: {
	// 				scroll: {
	// 					'/': 100,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	expect(screen.getByTestId('PageMainContent').scrollTop).toBe(100);
	// });

	// test('Scrolling', async () => {
	// 	window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
	// 	jest.spyOn(uiActions, 'setScrollPosition').mockImplementation(mockSetScrollPosition);

	// 	await componentRender(<PageMainContent>{children}</PageMainContent>, {
	// 		wrapInAct: true,
	// 	});

	// 	fireEvent.scroll(screen.getByTestId('PageMainContent'), { target: { scrollY: 100 } });

	// 	await waitFor(() => {
	// 		expect(mockDispatch).toHaveBeenCalledTimes(1);
	// 		expect(mockSetScrollPosition).toHaveBeenCalledTimes(1);
	// 		// Not works because i suppose wrapperRef is undefined
	// 		// expect(mockSetScrollPosition).toHaveBeenCalledWith({ path: '/', position: 100 });
	// 	});
	// });
});
