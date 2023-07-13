import { StateSchema } from '@/app/providers/StoreProvider';
import {
	getArticlesError,
	getArticlesHasMore,
	getArticlesIsLoading,
	getArticlesLimit,
	getArticlesNumber,
	getArticlesView,
} from './articlesPageSelectors';

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

describe('getArticlesHasMore', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { hasMore: true } };
		expect(getArticlesHasMore(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesHasMore(state as StateSchema)).toEqual(undefined);
	});
});

describe('getArticlesNumber', () => {
	test('Should return 1', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { page: 1 } };
		expect(getArticlesNumber(state as StateSchema)).toEqual(1);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesNumber(state as StateSchema)).toEqual(1);
	});
});

describe('getArticlesLimit', () => {
	test('Should return 5', () => {
		const state: DeepPartial<StateSchema> = { articlesPage: { limit: 5 } };
		expect(getArticlesLimit(state as StateSchema)).toEqual(5);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticlesLimit(state as StateSchema)).toEqual(9);
	});
});
