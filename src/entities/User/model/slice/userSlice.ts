import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

export const initialState: UserSchema = {
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
			setFeatureFlags(action.payload.features);
		},
		initAuthData: (state) => {
			const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
			if (user) {
				const userJson = JSON.parse(user) as User;
				state.authData = userJson;
				setFeatureFlags(userJson.features);
			}
			state._inited = true;
		},
		logout: (state) => {
			state.authData = undefined;
			// localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
		},
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
