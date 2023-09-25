import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/featureFlags';
import { ArticleListItemSkeletonBeautyProps } from './Beauty/ArticleListItemSkeleton';
import { ArticleListItemSkeletonBeauty } from './Beauty/ArticleListItemSkeleton.async';
import { ArticleListItemSkeletonMatrix } from './Matrix/ArticleListItemSkeleton.async';
import { ArticleListItemSkeletonMatrixProps } from './Matrix/ArticleListItemSkeleton';

export type ArticleListItemSkeletonProps =
	| ArticleListItemSkeletonMatrixProps
	| ArticleListItemSkeletonBeautyProps;
export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
	return (
		<ToggleFeatures
			name='isBeautyDesign'
			on={<ArticleListItemSkeletonBeauty {...(props as ArticleListItemSkeletonBeautyProps)} />}
			off={<ArticleListItemSkeletonMatrix {...(props as ArticleListItemSkeletonMatrixProps)} />}
		/>
	);
});
