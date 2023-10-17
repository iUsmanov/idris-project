// #store
import { ReactNode, memo } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store';
import { ReducersObject, StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
	children: ReactNode;
	initialState?: StateSchema;
	asyncReducers?: ReducersObject;
}

export const StoreProvider = memo((props: StoreProviderProps) => {
	const { children, initialState, asyncReducers } = props;

	const store = createReduxStore(initialState, asyncReducers);

	return <Provider store={store}>{children}</Provider>;
});
