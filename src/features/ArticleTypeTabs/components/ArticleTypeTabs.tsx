import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs } from '@/shared/components/Tabs/Tabs';
import { ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticlesType } from '../model/selectors/getArticlesType';
import { articlesTypeActions, articlesTypeReducer } from '../model/slice/articlesTypeSlice';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesType } from '../model/services/initArticleTypeTabs/initArticlesType';
import { useSearchParams } from 'react-router-dom';

interface ArticleTypeTabsProps {
	className?: string;
	onChangeType: () => void;
}

const reducers: ReducersList = {
	articlesType: articlesTypeReducer,
};

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
	const { className, onChangeType } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const type = useSelector(getArticlesType);
	const [searchParams] = useSearchParams();

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

	return (
		<Tabs
			className={classNames('', {}, [className])}
			onTabClick={changeTypeHandler}
			tabs={typeTabs}
			value={type}
		/>
	);
});
