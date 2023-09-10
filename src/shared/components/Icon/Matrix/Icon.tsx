import {
	MatrixSharedProvider,
	useMatrixSharedComponents,
} from '@/shared/lib/components/MatrixSharedProvider/MatrixSharedProvider';
import { Ref, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export interface IconMatrixProps extends React.SVGProps<SVGSVGElement> {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
	variant?: IconVariant;
	ref?: Ref<SVGSVGElement>;
}

type IconVariant = 'primary' | 'inverted';

export const Icon = memo((props: IconMatrixProps) => {
	const { className, Svg, variant = 'primary', ref, ...otherProps } = props;

	return <Svg ref={ref} {...otherProps} className={classNames('', {}, [className, cls[variant]])} />;
});

export type TypeOfIcon = typeof Icon;

const IconAsync = (props: IconMatrixProps) => {
	const { isLoaded, Icon } = useMatrixSharedComponents();

	if (!isLoaded) return null;

	return <Icon {...props} />;
};

export const IconMatrix = (props: IconMatrixProps) => {
	return (
		<MatrixSharedProvider>
			<IconAsync {...props} />
		</MatrixSharedProvider>
	);
};
