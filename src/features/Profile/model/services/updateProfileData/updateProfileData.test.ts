import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import { Profile } from '../../types/profile';

describe('updateProfileData.test', () => {
	test('Success update', async () => {
		const data: Profile = {
			age: 30,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: data,
			},
		});
		thunk.api.put.mockResolvedValue({ data });
		const action = await thunk.callThunk();

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.put).toHaveBeenCalled();
		expect(action.payload).toEqual(data);
		expect(action.meta.requestStatus).toEqual('fulfilled');
	});
	test('Server Error', async () => {
		const data: Profile = {
			age: 30,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: data,
			},
		});
		thunk.api.put.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk();

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.put).toHaveBeenCalled();
		expect(action.payload).toEqual(['serverError']);
		expect(action.meta.requestStatus).toEqual('rejected');
	});
	test('Validate Error', async () => {
		const data: Profile = {
			age: 0,
			avatar: 'https://',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: 'Styled',
			username: 'Chotkiy pocik',
		};
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: data,
			},
		});
		const action = await thunk.callThunk();

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.put).not.toHaveBeenCalled();
		expect(action.payload).toEqual(['incorrectAge']);
		expect(action.meta.requestStatus).toEqual('rejected');
	});
	test('Validate Errors', async () => {
		const data: Profile = {
			age: 0,
			avatar: '',
			city: 'Moscow',
			currency: Currency.RUB,
			country: Country.ARMENIA,
			first: 'Jackson',
			lastname: '',
			username: 'Chotkiy pocik',
		};
		const thunk = new TestAsyncThunk(updateProfileData, {
			profile: {
				formData: data,
			},
		});
		const action = await thunk.callThunk();

		// EXPECTS
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.put).not.toHaveBeenCalled();
		expect(action.payload).toEqual(['incorrectLastName', 'incorrectAge', 'incorrectAvatarLink']);
		expect(action.meta.requestStatus).toEqual('rejected');
	});
});
