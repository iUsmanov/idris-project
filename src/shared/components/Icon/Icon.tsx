import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
	variant?: IconVariant;
}

type IconVariant = 'primary' | 'inverted';

export const Icon = memo((props: IconProps) => {
	const { className, Svg, variant = 'primary', ...otherProps } = props;

	return <Svg {...otherProps} className={classNames('', {}, [className, cls[variant]])} />;
});
