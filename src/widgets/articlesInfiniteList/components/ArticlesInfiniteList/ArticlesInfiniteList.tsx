import { MutableRefObject, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getArticlesInfiniteList } from '../../model/slices/articlesInfiniteListSlice';
import {
	getArticlesInfiniteListError,
	getArticlesInfiniteListIsLoading,
	getArticlesInfiniteListView,
} from '../../model/selectors/articlesInfiniteListSelectors';
import { ArticleList } from '@/entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticlesSearch } from '@/features/ArticlesSearch';
import { ArticlesSort } from '@/features/ArticlesSort';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticlesInfiniteListBeauty } from './Beauty/ArticlesInfiniteList.async';
import { useArticlesInfiniteList } from '../../lib/hooks/useArticlesInfiniteList';

interface ArticlesInfiniteListProps {
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

	// useInfiniteScroll({
	// 	trigger: triggerRef.current,
	// 	parent: undefined,
	// 	callback: isLoading ? undefined : onLoadNextPart,
	// });

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
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticlesInfiniteListBeauty {...props} />}
			off={
				<VStack max gap='16' data-testid='ArticlesInfiniteList'>
					<HStack max justify='between'>
						<VStack gap='16' className={classNames('', {}, [className])}>
							<ArticlesSort onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} />
							<ArticlesSearch onChangeSearch={onChangeSearch} />
							<ArticleTypeTabs onChangeType={onChangeType} />
						</VStack>
						<ArticleViewSelector view={view} onViewClick={onChangeView} />
					</HStack>
					<ArticleList
						className={classNames('', {}, [className])}
						articles={articles}
						isLoading={isLoading}
						view={view}
					/>
					<div ref={triggerRef} />
				</VStack>
			}
		/>
	);
});
