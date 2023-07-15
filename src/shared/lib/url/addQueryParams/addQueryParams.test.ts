import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
	test('With one parameter', () => {
		const params = {
			test: 'value',
		};
		const queryString = getQueryParams(params);
		expect(queryString).toEqual('?test=value');
	});
	test('With multiple params', () => {
		const params = {
			test: 'value',
			second: '2',
		};
		const queryString = getQueryParams(params);
		expect(queryString).toEqual('?test=value&second=2');
	});
	test('With undefined', () => {
		const params = {
			test: 'value',
			second: undefined,
		};
		const queryString = getQueryParams(params);
		expect(queryString).toEqual('?test=value');
	});
});
