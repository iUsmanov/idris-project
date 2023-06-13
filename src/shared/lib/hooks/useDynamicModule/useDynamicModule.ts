import { useEffect } from 'react';
import { useAppDispatch } from '../useAppDispatch/useAppDispatch';
import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
	[name in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer];

interface useDynamicModuleProps {
	reducers: ReducersList;
	saveAfterUnmount?: boolean;
}

export const useDynamicModule = (props: useDynamicModuleProps) => {
	const { saveAfterUnmount = false, reducers } = props;
	const dispatch = useAppDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});
		return () => {
			Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
				if (saveAfterUnmount) return;
				store.reducerManager.remove(name);
				dispatch({ type: `@DESTROY ${name} reducer` });
			});
		};
		// eslint-disable-next-line
	}, []);
};
