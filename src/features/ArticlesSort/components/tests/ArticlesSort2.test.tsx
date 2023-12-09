import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ArticlesSort } from '../ArticlesSort';
import { articlesSortActions, articlesSortReducer } from '../../model/slice/articlesSortSlice';

const onChangeOrder = jest.fn();
const onChangeSort = jest.fn();

const mockDispatch = jest.fn();

const mockSetSort = jest.fn();
const mockSetOrder = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('ArticlesSort2.test', () => {
	test('Actions are really called to store', async () => {
		jest.spyOn(articlesSortActions, 'setSort').mockImplementation(mockSetSort);
		jest.spyOn(articlesSortActions, 'setOrder').mockImplementation(mockSetOrder);
		await componentRender(
			<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />,
			{
				wrapInAct: true,
				initialState: {
					articlesSort: {
						order: 'asc',
						sort: 'title',
					},
				},
				asyncReducers: {
					articlesSort: articlesSortReducer,
				},
			}
		);

		const selectSortField = screen.getByTestId('SortField.Select');
		const selectSortOrder = screen.getByTestId('SortOrder.Select');

		await userEvent.selectOptions(selectSortField, 'createdAt');
		await userEvent.selectOptions(selectSortOrder, 'desc');

		expect(mockSetSort).toHaveBeenCalledWith('createdAt');
		expect(mockSetOrder).toHaveBeenCalledWith('desc');
	});
});
