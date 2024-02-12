import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticleListBeauty } from './Beauty/ArticleList.async';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useArticleListMatrix } from '../../lib/hooks/useArticleListMatrix';

export interface ArticleListProps {
	className?: string;
	articles?: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	endReached?: VoidFunction;
	virtualization?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
	const {
		className,
		articles,
		isLoading,
		view = 'TILE',
		target,
		endReached,
		virtualization = false,
	} = props;
	const { t } = useTranslation('articles');

	const {
		Footer,
		renderArticleVirtualization,
		renderArticles,
		renderSkeletons,
		currentArticleId,
		virtuosoGridRef,
		mainRef,
	} = useArticleListMatrix({
		articles,
		view,
		className,
		isLoading,
		target,
		virtualization,
		endReached,
	});

	if ((!articles || !articles.length) && !isLoading) {
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={<ArticleListBeauty {...props} />}
				off={<Text align='center' size='size_l' title={t('Статьи не найдены')} />}
			/>
		);
	}

	if (view === 'LIST') {
		return (
			<ToggleFeatures
				name='isBeautyDesign'
				on={<ArticleListBeauty {...props} />}
				off={
					<VStack
						max
						className={classNames(cls.articleList, {}, [className, cls[view]])}
						data-testid='ArticleList.LIST'
						style={{ height: '100%' }}
					>
						<Virtuoso
							style={{ height: '100%', width: '100%' }}
							data={articles}
							endReached={endReached}
							itemContent={renderArticleVirtualization}
							initialTopMostItemIndex={currentArticleId || 0}
							components={{
								ScrollSeekPlaceholder: Footer,
								Footer,
							}}
							customScrollParent={mainRef.current}
						/>
					</VStack>
				}
			/>
		);
	}

	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticleListBeauty {...props} />}
			off={
				virtualization ? (
					<VirtuosoGrid
						ref={virtuosoGridRef}
						style={{ height: '100%', width: '100%' }}
						data={articles}
						endReached={endReached}
						totalCount={articles?.length}
						itemContent={renderArticleVirtualization}
						components={{
							Footer: Footer,
							ScrollSeekPlaceholder: Footer,
						}}
						listClassName={cls.flex}
						customScrollParent={mainRef.current}
					/>
				) : (
					<HStack
						gap='32'
						wrap='wrap'
						max
						className={classNames(cls.articleList, {}, [className, cls[view]])}
						data-testid='ArticleList.TILE'
					>
						{renderArticles}
						{renderSkeletons}
					</HStack>
				)
			}
		/>
	);
});

/* 

<VStack
						max
						className={classNames(cls.articleList, {}, [className, cls[view]])}
						data-testid='ArticleList.LIST'
					>
						{renderArticles}
						{renderSkeletons}
					</VStack>

*/
