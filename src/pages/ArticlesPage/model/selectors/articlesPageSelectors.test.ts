import { StateSchema } from '@/app/providers/StoreProvider';
import { getArticlesError, getArticlesIsLoading, getArticlesView } from './articlesPageSelectors';

describe('getArticlesIsLoading', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { isLoading: true } };
		expect(getArticlesIsLoading(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesIsLoading(state as StateSchema)).toEqual(false);
	});
});

describe('getArticlesError', () => {
	test('Should return true error', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { error: 'error' } };
		expect(getArticlesError(state as StateSchema)).toEqual('error');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesError(state as StateSchema)).toEqual(undefined);
	});
});

describe('getArticlesView', () => {
	test('Should return Tile', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { view: 'TILE' } };
		expect(getArticlesView(state as StateSchema)).toEqual('TILE');
	});
	test('Should return List', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { view: 'LIST' } };
		expect(getArticlesView(state as StateSchema)).toEqual('LIST');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesView(state as StateSchema)).toEqual('TILE');
	});
});
