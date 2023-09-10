import { FC, lazy } from 'react';
import { SkeletonBeautyProps } from './Skeleton';

export const SkeletonAsync = lazy<FC<SkeletonBeautyProps>>(() =>
	import('./Skeleton').then((module) => ({ default: module.Skeleton }))
);
