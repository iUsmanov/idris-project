import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesSort } from '../ArticlesSort';
import { screen } from '@testing-library/react';
import { articlesSortReducer } from '../../model/slice/articlesSortSlice';
import { userEvent } from '@testing-library/user-event';

const onChangeOrder = jest.fn();
const onChangeSort = jest.fn();

describe('ArticlesSort.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(
			<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />,
			{
				wrapInAct: true,
			}
		);

		expect(screen.getByTestId('ArticlesSort')).toBeInTheDocument();
		expect(screen.getByTestId('SortField')).toBeInTheDocument();
		expect(screen.getByTestId('SortOrder')).toBeInTheDocument();
	});
	test('Given handlers works', async () => {
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

		expect(onChangeSort).toHaveBeenCalled();
		expect(onChangeOrder).toHaveBeenCalled();
	});
});
