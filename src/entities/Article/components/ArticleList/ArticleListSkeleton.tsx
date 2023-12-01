import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleList.module.scss';
import { ArticleView } from '../../model/types/article';
import { HStack, VStack } from '@/shared/components/Stack';
import { ArticleListItemSkeleton } from '../ArticleListItemSkeleton/ArticleListItemSkeleton';

interface ArticleListSkeletonProps {
	className?: string;
	view: ArticleView;
}

export const ArticleListSkeleton = memo((props: ArticleListSkeletonProps) => {
	const { className, view } = props;

	if (view === 'TILE') {
		return (
			<HStack
				gap='32'
				wrap='wrap'
				className={classNames(cls.articleList, {}, [className, cls[view]])}
				data-testid='ArticleListSkeleton.TILE'
			>
				{new Array(9).fill(0).map((item, index) => (
					<ArticleListItemSkeleton key={index} view={view} className={cls.card} />
				))}
			</HStack>
		);
	}

	return (
		<VStack
			max
			className={classNames(cls.articleList, {}, [className, cls[view]])}
			data-testid='ArticleListSkeleton.LIST'
		>
			{new Array(3).fill(0).map((item, index) => (
				<ArticleListItemSkeleton key={index} view={view} className={cls.card} />
			))}
		</VStack>
	);
});
