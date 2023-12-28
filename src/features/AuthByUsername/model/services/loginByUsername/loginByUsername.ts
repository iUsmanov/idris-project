import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
	'login/loginByUsername',
	async (authData, thunkAPI) => {
		const { dispatch, extra, rejectWithValue } = thunkAPI;
		try {
			// const response = await axios.post<User>('http://localhost:8000/login', authData);
			const response = await extra.api.post<User>('/login', authData);
			if (!response.data) {
				throw new Error();
			}

			// localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(response.data));
			dispatch(userActions.setAuthData(response.data));
			window.location.reload();
			return response.data;
		} catch (e) {
			console.log(e);
			return rejectWithValue('error');
		}
	}
);
