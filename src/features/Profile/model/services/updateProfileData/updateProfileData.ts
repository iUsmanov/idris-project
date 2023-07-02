import { createAsyncThunk } from '@reduxjs/toolkit';
import { Profile } from '../../types/profile';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
	'profile/updateProfileData',
	async (_, thunkAPI) => {
		const { extra, rejectWithValue, getState } = thunkAPI;

		const formData = getProfileFormData(getState());

		try {
			const response = await extra.api.put<Profile>(`/profiles/1`, formData);
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
