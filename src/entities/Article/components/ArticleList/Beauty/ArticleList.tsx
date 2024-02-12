import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../../model/types/article';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { useArticleListBeauty } from '../../../lib/hooks/useArticleListBeauty';
import { Virtuoso } from 'react-virtuoso';

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
		currentArticleId,
		renderArticleVirtualization,
		renderArticles,
		renderSkeletons,
		virtuosoGridRef,
	} = useArticleListBeauty({
		view,
		virtualization,
		articles,
		className,
		endReached,
		isLoading,
		target,
	});

	if ((!articles || !articles.length) && !isLoading) {
		return <Text align='center' size='size_l' title={t('Статьи не найдены')} />;
	}

	if (view === 'LIST') {
		return (
			<VStack
				max
				className={classNames(cls.articleList, {}, [className, cls[view]])}
				data-testid='ArticleList.LIST'
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
					customScrollParent={document.body}
				/>
			</VStack>
		);
	}

	return (
		<HStack
			gap='16'
			wrap='wrap'
			max
			className={classNames(cls.articleList, {}, [className, cls[view]])}
			data-testid='ArticleList.TILE'
		>
			{renderArticles}
			{renderSkeletons}
		</HStack>
	);
});

/* 

	if (view === 'LIST') {
		return (
			<VStack
				max
				className={classNames(cls.articleList, {}, [className, cls[view]])}
				data-testid='ArticleList.LIST'
			>
				{renderArticles}
				{renderSkeletons}
			</VStack>
		);
	}

	return (
		<HStack
			gap='16'
			wrap='wrap'
			max
			className={classNames(cls.articleList, {}, [className, cls[view]])}
			data-testid='ArticleList.TILE'
		>
			{renderArticles}
			{renderSkeletons}
		</HStack>
	);

*/
