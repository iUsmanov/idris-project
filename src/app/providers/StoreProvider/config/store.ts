import { AnyAction, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { authMiddleware, loginReducer } from '@/features/AuthByUsername';
import { createReducerManager } from './reducerManager';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema, AnyAction> = {
		counter: counterReducer,
		user: userReducer,
		loginForm: loginReducer,
	};

	const reducerManager = createReducerManager(rootReducer);
	// return configureStore<StateSchema>({ StateSchema пришлось убрать из-за поля middleware
	const store = configureStore({
		reducer: rootReducer,
		preloadedState: initialState,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
	});
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};
