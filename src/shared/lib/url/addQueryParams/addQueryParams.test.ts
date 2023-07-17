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
	test('test with initial query params', () => {
		jest.spyOn(window, 'location', 'get').mockReturnValue({
			...window.location,
			search: '?abc=1&second=4',
		});

		const params = getQueryParams({
			test: undefined,
			second: '2',
		});

		expect(params).toBe('?abc=1&second=2');
	});
});
