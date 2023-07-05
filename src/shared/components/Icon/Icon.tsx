import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
	inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
	const { className, Svg, inverted, ...otherProps } = props;

	return (
		<Svg
			{...otherProps}
			className={classNames('', { [cls.icon]: !inverted, [cls.inverted]: inverted }, [className])}
		/>
	);
});
