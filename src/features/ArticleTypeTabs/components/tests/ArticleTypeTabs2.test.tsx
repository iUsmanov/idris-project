import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ArticleTypeTabs } from '../ArticleTypeTabs';
import { articlesTypeActions, articlesTypeReducer } from '../../model/slice/articlesTypeSlice';

const onChangeType = jest.fn();
const mockSetType = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('ArticlesTypeTabs.test', () => {
	test('Action are really called to store', async () => {
		jest.spyOn(articlesTypeActions, 'setType').mockImplementation(mockSetType);

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

		await userEvent.click(scienseTab);

		expect(mockSetType).toHaveBeenCalledWith('SCIENCE');
	});
});
