import { AnyAction, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { authMiddleware, loginReducer } from '@/features/AuthByUsername';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema, AnyAction> = {
		counter: counterReducer,
		user: userReducer,
		loginForm: loginReducer,
	};

	// return configureStore<StateSchema>({ StateSchema пришлось убрать из-за поля middleware
	return configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
	});
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
