import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/components/Skeleton/Skeleton';

const ArticleRatingLazy = lazy(() =>
	import('./ArticleRating').then((module) => ({
		default: module.ArticleRating,
	}))
);

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
	<Suspense fallback={<Skeleton width={'100%'} height={120} />}>
		<ArticleRatingLazy {...props} />
	</Suspense>
);
