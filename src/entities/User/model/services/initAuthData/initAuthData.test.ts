import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { initAuthData } from './initAuthData';
import { LOCAL_STORAGE_APP_DESIGN_KEY, LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';
import { getUserDataByIdQuery } from '../../api/userApi';

jest.mock('../../api/userApi');
const mockGetUserDataByIdQuery = getUserDataByIdQuery as jest.Mock;

// const mockGetUserDataByIdQuery = jest.fn();
// jest.mock('../../api/userApi', () => ({
// 	...jest.requireActual('../../api/userApi'),
// 	getUserDataByIdQuery: () => mockGetUserDataByIdQuery,
// }));

describe('initAuthData.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('UserId is not defined', async () => {
		const thunk = new TestAsyncThunk(initAuthData);
		const action = await thunk.callThunk();
		// thunk.api.get.mockRejectedValue()

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).not.toHaveBeenCalled();
		expect(action.meta.requestStatus).toBe('rejected');
		expect(action.payload).toEqual('UserId is not defined');
	});

	test('Error', async () => {
		localStorage.setItem(LOCAL_STORAGE_USER_KEY, '1');
		const thunk = new TestAsyncThunk(initAuthData);
		const action = await thunk.callThunk();
		mockGetUserDataByIdQuery.mockRejectedValue('');

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(mockGetUserDataByIdQuery).toHaveBeenCalledWith('1');
		expect(action.meta.requestStatus).toBe('rejected');
		expect(action.payload).toEqual('error');
		expect(localStorage.getItem(LOCAL_STORAGE_APP_DESIGN_KEY)).toBe(null);
	});

	// test('Fulfilled', async () => {
	// К сожалению, не смог сделать так, чтобы `dispatch(getUserDataByIdQuery(userId)).unwrap();` нормально работало
	// 	localStorage.setItem(LOCAL_STORAGE_USER_KEY, '1');
	// 	const thunk = new TestAsyncThunk(initAuthData);
	// 	const action = await thunk.callThunk();
	// 	mockGetUserDataByIdQuery.mockReturnValue({ data: mockUser });

	// 	// EXPECTS
	// 	expect(thunk.dispatch).toHaveBeenCalledTimes(3);
	// 	expect(mockGetUserDataByIdQuery).toHaveBeenCalledWith('1');
	// 	expect(action.payload).toEqual(mockUser);
	// 	expect(action.meta.requestStatus).toBe('fulfilled');
	// 	expect(localStorage.getItem(LOCAL_STORAGE_APP_DESIGN_KEY)).toBe('beauty-design');
	// });
});
