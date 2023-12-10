import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { mockProfile } from '@/entities/Profile/testing';

describe('fetchProfileData.test', () => {
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockResolvedValue({ data: mockProfile });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual(mockProfile);
		expect(action.meta.requestStatus).toEqual('fulfilled');
	});
	test('Rejected', async () => {
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual('error');
		expect(action.meta.requestStatus).toEqual('rejected');
	});
});
