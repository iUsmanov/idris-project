import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
	className?: string;
	width: string | number;
	height: string | number;
	borderRadius?: string;
	style?: CSSProperties;
}

export const Skeleton = memo((props: SkeletonProps) => {
	const { className, borderRadius, height, width, style } = props;

	const styles: CSSProperties = {
		...style,
		width,
		height,
		borderRadius,
	};

	return <div style={styles} className={classNames(cls.skeleton, {}, [className])}></div>;
});
