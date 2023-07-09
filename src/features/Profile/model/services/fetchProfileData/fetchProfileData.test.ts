import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { Image } from '@/shared/assets/tests/storybook.jpg';

describe('fetchProfileData.test', () => {
	test('Success load', async () => {
		const data = {
			age: 30,
			avatar: Image,
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const thunk = new TestAsyncThunk(fetchProfileData);
		thunk.api.get.mockResolvedValue({ data });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual(data);
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
