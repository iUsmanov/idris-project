import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { HStack } from '@/shared/components/Stack';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { Text } from '@/shared/components/Text/Text';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
	if (view === 'TILE') {
		return (
			<HStack
				gap='32'
				wrap='wrap'
				className={classNames(cls.articleList, {}, [/* className,  */ cls[view]])}
			>
				{new Array(9).fill(0).map((item, index) => (
					<ArticleListItemSkeleton key={index} view={view} className={cls.card} />
				))}
			</HStack>
		);
	} else {
		return (
			<div className={classNames(cls.articleList, {}, [/* className,  */ cls[view]])}>
				{new Array(3).fill(0).map((item, index) => (
					<ArticleListItemSkeleton key={index} view={view} className={cls.card} />
				))}
			</div>
		);
	}
};

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = 'TILE', target } = props;
	const { t } = useTranslation();

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<ArticleListItem
					target={target}
					key={article.id}
					article={article}
					view={view}
					className={cls.card}
				/>
			);
		},
		[target, view]
	);

	const renderArticles = articles && articles.length && articles.map(renderArticle);
	const renderSkeletons = isLoading && getSkeletons(view);

	if ((!articles || !articles.length) && !isLoading) {
		return <Text align='center' size='size_l' title={t('Статьи не найдены')} />;
	}

	if (view === 'LIST') {
		return (
			<div className={classNames(cls.articleList, {}, [className, cls[view]])}>
				{renderArticles}
				{renderSkeletons}
			</div>
		);
	}

	return (
		<HStack gap='32' wrap='wrap' className={classNames(cls.articleList, {}, [className, cls[view]])}>
			{renderArticles}
			{renderSkeletons}
		</HStack>
	);
});
