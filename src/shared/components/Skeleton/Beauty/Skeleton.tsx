import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

export interface SkeletonBeautyProps {
	className?: string;
	width: string | number;
	height: string | number;
	borderRadius?: string;
	style?: CSSProperties;
}

export const Skeleton = memo((props: SkeletonBeautyProps) => {
	const { className, borderRadius, height, width, style } = props;

	const styles: CSSProperties = {
		...style,
		width,
		height,
		borderRadius,
	};

	return <div style={styles} className={classNames(cls.skeleton, {}, [className])}></div>;
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
