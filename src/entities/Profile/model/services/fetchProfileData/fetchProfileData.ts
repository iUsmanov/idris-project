import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../types/profile';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
	'profile/fetchProfileData',
	async (_, thunkAPI) => {
		const { extra, rejectWithValue } = thunkAPI;
		try {
			const response = await extra.api.get<Profile>(`/profiles/1`);
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
