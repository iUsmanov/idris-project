import { loginByUsername } from './loginByUsername';
import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');

// describe('loginByUsername.test', () => {
// 	const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
// 	let dispatch: Dispatch;
// 	let getState: () => StateSchema;

// 	beforeEach(() => {
// 		dispatch = jest.fn();
// 		getState = jest.fn();
// 	});
// 	test('Success login', async () => {
// 		const user = { id: '1', username: '123' };
// 		mockedAxiosPost.mockResolvedValue({ data: user });
// 		// mockedAxios.post.mockReturnValue(Promise.resolve({ data: user }));
// 		const actionCreator = loginByUsername({ username: '123', password: '123' });
// 		const action = await actionCreator(dispatch, getState, undefined);

// 		// EXPECTS
// 		expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(user));
// 		expect(dispatch).toHaveBeenCalledTimes(3);
// 		expect(mockedAxiosPost).toHaveBeenCalled();
// 		expect(action.meta.requestStatus).toBe('fulfilled');
// 		expect(action.payload).toEqual(user);
// 	});
// 	test('Error login', async () => {
// 		mockedAxiosPost.mockResolvedValue({ status: 403 });
// 		const actionCreator = loginByUsername({ username: '123', password: '123' });
// 		const action = await actionCreator(dispatch, getState, undefined);

// 		// EXPECTS
// 		expect(dispatch).toHaveBeenCalledTimes(2);
// 		expect(mockedAxiosPost).toHaveBeenCalled();
// 		expect(action.meta.requestStatus).toBe('rejected');
// 		expect(action.payload).toEqual('error');
// 	});
// });

describe('loginByUsername.test', () => {
	test('Success login', async () => {
		const user = { id: '1', username: '123' };
		// mockedAxiosPost.mockResolvedValue({ data: user });
		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockResolvedValue({ data: user });
		const action = await thunk.callThunk({ username: '123', password: '123' });

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(user));
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		expect(thunk.api.post).toHaveBeenCalled();
		expect(action.meta.requestStatus).toBe('fulfilled');
		expect(action.payload).toEqual(user);
	});
	test('Rejected', async () => {
		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk({ username: '123', password: '123' });

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.post).toHaveBeenCalled();
		expect(action.meta.requestStatus).toBe('rejected');
		expect(action.payload).toEqual('error');
	});
});
