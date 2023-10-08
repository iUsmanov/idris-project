import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TabItem } from '@/shared/components/Tabs';
import { ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesTypeActions, articlesTypeReducer } from '../../model/slice/articlesTypeSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesType } from '../../model/services/initArticleTypeTabs/initArticlesType';
import { useSearchParams } from 'react-router-dom';

export function useArticleTypeTabs(onChangeType: VoidFunction) {
	const { t } = useTranslation('articles');
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	const reducers = useMemo<ReducersList>(
		() => ({
			articlesType: articlesTypeReducer,
		}),
		[]
	);

	useDynamicModule({ reducers, saveAfterUnmount: true });

	useInitialEffect(() => {
		dispatch(initArticlesType(searchParams));
	});

	const typeTabs = useMemo<TabItem<ArticleType>[]>(
		() => [
			{
				content: t('Все статьи'),
				value: 'ALL',
			},
			{
				content: t('Экономика'),
				value: 'ECONOMICS',
			},
			{
				content: t('Наука'),
				value: 'SCIENCE',
			},
			{
				content: t('Айти'),
				value: 'IT',
			},
		],
		[t]
	);

	const changeTypeHandler = useCallback(
		(newTab: TabItem<ArticleType>) => {
			dispatch(articlesTypeActions.setType(newTab.value));
			onChangeType();
		},
		[dispatch, onChangeType]
	);

	return {
		typeTabs,
		changeTypeHandler,
	};
}
