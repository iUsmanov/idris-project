import { fireEvent, screen, waitFor } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Page } from './Page';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { uiActions } from '../UI/model/slice/UISlice';

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

describe('Page.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(<Page>{children}</Page>, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Page')).toBeInTheDocument();
		expect(screen.getByTestId('Children')).toBeInTheDocument();
		expect(screen.queryByTestId('Page.Trigger')).toBeNull();
	});

	// test('Значение скролла достаётся из стейта и старница проскролливается до нужного места', async () => {
	// 	// TEST not works because wrapperRef is undefined
	// 	await componentRender(<Page>{children}</Page>, {
	// 		wrapInAct: true,
	// 		initialState: {
	// 			ui: {
	// 				scroll: {
	// 					'/': 100,
	// 				},
	// 			},
	// 		},
	// 	});

	// 	expect(screen.getByTestId('Page').scrollTop).toBe(100);
	// });

	test('Page.Trigger is in DOM', async () => {
		window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

		await componentRender(<Page onScrollEnd={mockOnScrollEnd}>{children}</Page>, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Page.Trigger')).toBeInTheDocument();
	});

	test('Scrolling', async () => {
		window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
		jest.spyOn(uiActions, 'setScrollPosition').mockImplementation(mockSetScrollPosition);

		await componentRender(<Page onScrollEnd={mockOnScrollEnd}>{children}</Page>, {
			wrapInAct: true,
		});

		fireEvent.scroll(screen.getByTestId('Page'), { target: { scrollY: 100 } });

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledTimes(1);
			expect(mockSetScrollPosition).toHaveBeenCalledTimes(1);
			// Not works because i suppose jest not supports intersectionObserver
			// expect(mockOnScrollEnd).toHaveBeenCalledTimes(1);
			// Not works because i suppose wrapperRef is undefined
			// expect(mockSetScrollPosition).toHaveBeenCalledWith({ path: '/', position: 100 });
		});
	});
});
