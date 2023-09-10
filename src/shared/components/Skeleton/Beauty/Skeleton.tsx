import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';

export interface SkeletonBeautyProps {
	className?: string;
}

export const Skeleton = memo((props: SkeletonBeautyProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return <div className={classNames(cls.skeleton, {}, [className])}></div>;
});

const SkeletonAsync = (props: SkeletonBeautyProps) => {
	const { isLoaded, Skeleton } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Skeleton {...props} />;
};

export const SkeletonBeauty = (props: SkeletonBeautyProps) => {
	return (
		<BeautySharedProvider>
			<SkeletonAsync {...props} />
		</BeautySharedProvider>
	);
};
