import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { CSSProperties, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';
import { TestProps } from '@/shared/types/tests';

export interface SkeletonMatrixProps extends TestProps {
	className?: string;
	width: string | number;
	height: string | number;
	borderRadius?: string;
	style?: CSSProperties;
}

export const Skeleton = memo((props: SkeletonMatrixProps) => {
	const {
		className,
		borderRadius,
		height,
		width,
		['data-testid']: dataTestId = 'Skeleton',
		style,
	} = props;

	const styles: CSSProperties = {
		...style,
		width,
		height,
		borderRadius,
	};

	return (
		<div
			data-testid={dataTestId}
			style={styles}
			className={classNames(cls.skeleton, {}, [className])}
		></div>
	);
});

const SkeletonAsync = (props: SkeletonMatrixProps) => {
	const { isLoaded, Skeleton } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Skeleton {...props} />;
};

export const SkeletonMatrix = (props: SkeletonMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<SkeletonAsync {...props} />
		</MatrixSharedProvider>
	);
};
