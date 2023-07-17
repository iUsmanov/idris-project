import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/components/Card/Card';
import { Input } from '@/shared/components/Input/Input';
import { useSearchParams } from 'react-router-dom';
import { articlesSearchActions, articlesSearchReducer } from '../model/slice/articlesSearchSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesSearch } from '../model/selectors/getArticlesSearch';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesSearch } from '../model/services/initArticlesSearch/initArticlesSearch';

interface ArticlesSearchProps {
	className?: string;
	onChangeSearch: () => void;
}

const reducers: ReducersList = {
	articlesSearch: articlesSearchReducer,
};

export const ArticlesSearch = memo((props: ArticlesSearchProps) => {
	const { className, onChangeSearch } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const search = useSelector(getArticlesSearch);

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

	return (
		<Card className={classNames('', {}, [className])}>
			<Input placeholder={t('Поиск')} value={search} onChange={changeSearchHandler} />
		</Card>
	);
});
