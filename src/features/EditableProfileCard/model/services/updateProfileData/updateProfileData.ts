import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData';
import { validateProfileErrors } from '../validateProfileData/validateProfileData';
import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '../../types/editableProfileCardSchema';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
	'profile/updateProfileData',
	async (_, thunkAPI) => {
		const { extra, rejectWithValue, getState } = thunkAPI;

		const formData = getProfileFormData(getState());

		const errors = validateProfileErrors(formData);

		if (errors.length) {
			return rejectWithValue(errors);
		}

		try {
			const response = await extra.api.put<Profile>(`/profiles/${formData?.id}`, formData);
			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(['serverError']);
		}
	}
);
