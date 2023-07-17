import { useEffect } from 'react';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

// type ReducersListEntry = [StateSchemaKey, Reducer];after turn on strict-mode, not need

interface useDynamicModuleProps {
	reducers: ReducersList;
	saveAfterUnmount?: boolean;
}

export const useDynamicModule = (props: useDynamicModuleProps) => {
	const { saveAfterUnmount = false, reducers } = props;
	const dispatch = useAppDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			if (store.getState()[name as StateSchemaKey]) return;
			store.reducerManager.add(name as StateSchemaKey, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});
		return () => {
			Object.entries(reducers).forEach(([name, reducer]) => {
				if (saveAfterUnmount) return;
				store.reducerManager.remove(name as StateSchemaKey);
				dispatch({ type: `@DESTROY ${name} reducer` });
			});
		};
		// eslint-disable-next-line
	}, []);
};
