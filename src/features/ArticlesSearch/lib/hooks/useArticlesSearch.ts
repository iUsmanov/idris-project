import { useCallback, useMemo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSearchParams } from 'react-router-dom';
import { articlesSearchActions, articlesSearchReducer } from '../../model/slice/articlesSearchSlice';
import { initArticlesSearch } from '../../model/services/initArticlesSearch/initArticlesSearch';

export function useArticlesSearch(onChangeSearch: VoidFunction) {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const reducers = useMemo<ReducersList>(
		() => ({
			articlesSearch: articlesSearchReducer,
		}),
		[]
	);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesSearch(searchParams));
	});

	const changeSearchHandler = useCallback(
		(search: string) => {
			dispatch(articlesSearchActions.setSearch(search));
			onChangeSearch();
		},
		[dispatch, onChangeSearch]
	);
	return {
		changeSearchHandler,
	};
}
