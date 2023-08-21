import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../../types/user';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
	'user/initAuthData',
	async (_, thunkApi) => {
		const { rejectWithValue, dispatch } = thunkApi;

		const userId = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

		if (!userId) {
			return rejectWithValue('UserId is not defined');
		}

		try {
			const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

			return response;
		} catch (e) {
			return rejectWithValue('error');
		}
	}
);
