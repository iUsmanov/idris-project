// #store
import { AnyAction, CombinedState, Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { authMiddleware } from '@/features/AuthByUsername';
import { createReducerManager } from './reducerManager';
import { $api } from '@/shared/api/api';
import { uiReducer } from '@/widgets/Page';
import { rtkApi } from '@/shared/api/rtkApi';

export const createReduxStore = (
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) => {
	const rootReducer: ReducersMapObject<StateSchema, AnyAction> = {
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
