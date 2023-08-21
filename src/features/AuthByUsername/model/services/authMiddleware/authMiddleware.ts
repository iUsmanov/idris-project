import { Action, Dispatch, isAnyOf, isFulfilled } from '@reduxjs/toolkit';
import { userActions } from '@/entities/User';
import { LOCAL_STORAGE_USER_KEY } from '@/shared/const/localStorage';
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
		}

		if (isLoggedOut(action)) {
			localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
		}

		next(action);
	};
