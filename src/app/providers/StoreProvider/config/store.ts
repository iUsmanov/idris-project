// #store
import { AnyAction, CombinedState, Reducer, configureStore } from '@reduxjs/toolkit';
import { ReducersObject, StateSchema, ThunkExtraArg } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { authMiddleware } from '@/features/AuthByUsername';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { uiReducer } from '@/shared/lib/UI';

/**
 * @param children - что мы хотим обернуть в Provider?
 * @param initialState - Состояние стейта по умолчанию. Используется только в тестах и сторибуке.
 * Предназначен для мокания стейта.
 * @param asyncReducers - Редюсеры стора по умолчанию. Используется только в тестах и сторибуке.
 * Предназначен для мокания редюсеров.
 * */
export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersObject) => {
	const rootReducer: ReducersObject = {
		...asyncReducers,
		counter: counterReducer,
		user: userReducer,
		ui: uiReducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	};

	const reducerManager = createReducerManager(rootReducer);

	const extraArg: ThunkExtraArg = {
		api: $api,
	};

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>, AnyAction>,
		preloadedState: initialState,
		devTools: __IS_DEV__,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}).concat(rtkApi.middleware, authMiddleware),
	});
	// @ts-ignore
	store.reducerManager = reducerManager;

	return store;
};
