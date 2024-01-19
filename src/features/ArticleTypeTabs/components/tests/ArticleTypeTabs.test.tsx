import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticleTypeTabs } from '../ArticleTypeTabs';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import { articlesTypeReducer } from '../../model/slice/articlesTypeSlice';

const onChangeType = jest.fn();

describe('ArticleTypeTabs.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(<ArticleTypeTabs onChangeType={onChangeType} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ArticleTypeTabs')).toBeInTheDocument();
	});
	test('Given handler works - MatrixDesign', async () => {
		await componentRender(<ArticleTypeTabs onChangeType={onChangeType} />, {
			wrapInAct: true,
			initialState: {
				articlesType: {
					type: 'ALL',
				},
			},
			asyncReducers: {
				articlesType: articlesTypeReducer,
			},
		});

		const scienseTab = screen.getByText('Наука');

		expect(scienseTab).toHaveClass('outline');
		await userEvent.click(scienseTab);

		expect(onChangeType).toHaveBeenCalled();
		expect(scienseTab).toHaveClass('primary');
	});
	test('Given handler works - BeautyDesign', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		await componentRender(<ArticleTypeTabs onChangeType={onChangeType} />, {
			wrapInAct: true,
			initialState: {
				articlesType: {
					type: 'ALL',
				},
			},
			asyncReducers: {
				articlesType: articlesTypeReducer,
			},
		});

		const scienseTab = screen.getByText('Наука');

		expect(scienseTab).toHaveClass('primary');
		await userEvent.click(scienseTab);

		expect(onChangeType).toHaveBeenCalled();
		expect(scienseTab).toHaveClass('light');
	});
});
