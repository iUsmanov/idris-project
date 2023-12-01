import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { HStack, VStack } from '@/shared/components/Stack';
import { Text } from '@/shared/components/Text';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticleListBeauty } from './Beauty/ArticleList.async';
import { ArticleListSkeleton } from './ArticleListSkeleton';

interface ArticleListProps {
	className?: string;
	articles?: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleList = memo((props: ArticleListProps) => {
	const { className, articles, isLoading, view = 'TILE', target } = props;
	const { t } = useTranslation('articles');

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
	const renderSkeletons = isLoading && <ArticleListSkeleton view={view} className={className} />;

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
					>
						{renderArticles}
						{renderSkeletons}
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
			}
		/>
	);
});
