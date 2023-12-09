import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesSearch } from '../ArticlesSearch';
import { screen } from '@testing-library/react';
import { articlesSearchActions, articlesSearchReducer } from '../../../model/slice/articlesSearchSlice';
import { userEvent } from '@testing-library/user-event';

// jest.mock('../model/slice/articlesSearchSlice', () => {
// 	return {
// 		...jest.requireActual('../model/slice/articlesSearchSlice'),
// 		articlesSearchActions: {
// 			...jest.requireActual('../model/slice/articlesSearchSlice').articlesSearchActions,
// 			setSearch: jest.fn(),
// 		},
// 	};
// });

const onChangeSearch = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('ArticlesSearch.test', () => {
	test('Typing 2. test call of articlesSearchActions.setSearch', async () => {
		const mockSetSearch = jest.fn();
		jest.spyOn(articlesSearchActions, 'setSearch').mockImplementation(mockSetSearch);
		await componentRender(<ArticlesSearch onChangeSearch={onChangeSearch} />, {
			wrapInAct: true,
			initialState: {
				articlesSearch: {
					search: '',
				},
			},
			asyncReducers: {
				articlesSearch: articlesSearchReducer,
			},
		});

		await userEvent.type(screen.getByTestId('ArticlesSearch'), 'Text');
		expect(mockSetSearch).toHaveBeenCalledWith('T');
		expect(mockSetSearch).toHaveBeenCalledWith('e');
		expect(mockSetSearch).toHaveBeenCalledWith('x');
		expect(mockSetSearch).toHaveBeenCalledWith('t');
	});
});
