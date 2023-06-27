import { AnyAction, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { authMiddleware } from '@/features/AuthByUsername';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';

export const createReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) => {
	const rootReducer: ReducersMapObject<StateSchema, AnyAction> = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
	};

	const reducerManager = createReducerManager(rootReducer);
	// return configureStore<StateSchema>({ StateSchema пришлось убрать из-за поля middleware
	const store = configureStore({
		reducer: reducerManager.reduce,
		preloadedState: initialState,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						api: $api,
					},
				},
			}).concat(authMiddleware),
	});
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};
