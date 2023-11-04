import { Action, Dispatch, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_APP_DESIGN_KEY, LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';
import { StateSchema } from '@/app/providers/StoreProvider';
import { loginByUsername } from '../loginByUsername/loginByUsername';

interface Store {
	dispatch: Dispatch;
	getState: () => StateSchema;
}

const isLoggedIn = isFulfilled(loginByUsername);
const isLoggedOut = isAnyOf(userActions.logout);

export const authMiddleware =
	(store: Store) =>
	(next: (action: Action) => void) =>
	(action: Action): void => {
		if (isLoggedIn(action)) {
			localStorage.setItem(LOCAL_STORAGE_USER_KEY, action.payload.id);
			localStorage.setItem(
				LOCAL_STORAGE_APP_DESIGN_KEY,
				action.payload.features?.isBeautyDesign ? 'beauty-design' : 'matrix-design'
			);
		}

		if (isLoggedOut(action)) {
			localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
			localStorage.removeItem(LOCAL_STORAGE_APP_DESIGN_KEY);
		}

		next(action);
	};
