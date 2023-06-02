import { AnyAction, ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';

export const createReduxStore = (initialState?: StateSchema) => {
	const rootReducer: ReducersMapObject<StateSchema, AnyAction> = {
		counter: counterReducer,
		user: userReducer,
	};

	return configureStore<StateSchema>({
		reducer: rootReducer,
		preloadedState: initialState,
		devTools: __IS_DEV__,
	});
};
