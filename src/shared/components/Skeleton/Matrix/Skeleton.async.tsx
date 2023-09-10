import { FC, lazy } from 'react';
import { SkeletonMatrixProps } from './Skeleton';

export const SkeletonAsync = lazy<FC<SkeletonMatrixProps>>(() =>
	import('./Skeleton').then((module) => ({ default: module.Skeleton }))
);
