import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ArticlesSearch } from '../ArticlesSearch';
import { screen } from '@testing-library/react';
import { articlesSearchReducer } from '../../../model/slice/articlesSearchSlice';
import { userEvent } from '@testing-library/user-event';

const onChangeSearch = jest.fn();

describe('ArticlesSearch.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Component is rendered', async () => {
		await componentRender(<ArticlesSearch onChangeSearch={onChangeSearch} />, {
			wrapInAct: true,
		});
		expect(screen.getByTestId('ArticlesSearch')).toBeInTheDocument();
	});
	test('Input has value', async () => {
		await componentRender(<ArticlesSearch onChangeSearch={onChangeSearch} />, {
			wrapInAct: true,
			initialState: {
				articlesSearch: {
					search: 'Text',
				},
			},
			asyncReducers: {
				articlesSearch: articlesSearchReducer,
			},
		});
		expect(screen.getByTestId('ArticlesSearch')).toHaveValue('Text');
	});
	test('Typing, Input has value, onChangeSearch calls', async () => {
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
		const input = screen.getByTestId('ArticlesSearch');
		await userEvent.type(input, 'Text');
		expect(input).toHaveValue('Text');
		expect(onChangeSearch).toHaveBeenCalledTimes(4);
	});
});
