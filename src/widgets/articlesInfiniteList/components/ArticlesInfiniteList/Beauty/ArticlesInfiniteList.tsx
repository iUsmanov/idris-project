import { MutableRefObject, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import cls from './ArticlesInfiniteList.module.scss';
import { getArticlesInfiniteList } from '../../../model/slices/articlesInfiniteListSlice';
import {
	getArticlesInfiniteListError,
	getArticlesInfiniteListIsLoading,
	getArticlesInfiniteListView,
} from '../../../model/selectors/articlesInfiniteListSelectors';
import { ArticleList } from '@/entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticlesSearch } from '@/features/ArticlesSearch';
import { ArticlesSort } from '@/features/ArticlesSort';
import { Text } from '@/shared/components/Text';
import { StickyContentLayout } from '@/shared/layouts';
import { Card } from '@/shared/components/Card';
import { useArticlesInfiniteList } from '../../../lib/hooks/useArticlesInfiniteList';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

export interface ArticlesInfiniteListProps {
	className?: string;
}

export const ArticlesInfiniteList = memo((props: ArticlesInfiniteListProps) => {
	const { className } = props;
	const { t } = useTranslation();
	const articles = useSelector(getArticlesInfiniteList.selectAll);
	const isLoading = useSelector(getArticlesInfiniteListIsLoading);
	const error = useSelector(getArticlesInfiniteListError);
	const view = useSelector(getArticlesInfiniteListView);
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	const { onChangeView, onChangeSort, onChangeOrder, onChangeSearch, onChangeType, onLoadNextPart } =
		useArticlesInfiniteList();

	useInfiniteScroll({
		trigger: triggerRef.current,
		parent: undefined,
		callback: onLoadNextPart,
	});

	if (error) {
		return (
			<Text
				align='center'
				size='size_l'
				variant='error'
				title={t('Произошла непредвиденная ошибка')}
			/>
		);
	}

	return (
		<StickyContentLayout
			data-testid='ArticlesInfiniteList'
			left={<ArticleViewSelector view={view} onViewClick={onChangeView} />}
			content={
				<>
					<ArticleList
						className={classNames('', {}, [className])}
						articles={articles}
						isLoading={isLoading}
						view={view}
					/>
					<div ref={triggerRef} />
				</>
			}
			right={
				<Card
					flex
					direction='column'
					gap='32'
					padding='24'
					className={classNames(cls.filters, {}, [className])}
				>
					<ArticlesSearch onChangeSearch={onChangeSearch} />
					<ArticleTypeTabs onChangeType={onChangeType} />
					<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
				</Card>
			}
		/>
	);
});
