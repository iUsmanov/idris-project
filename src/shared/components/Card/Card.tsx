import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'primary' | 'outline';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
}

export const Card = memo((props: CardProps) => {
	const { className, children, max, variant = 'primary', ...otherProps } = props;

	return (
		<div
			{...otherProps}
			className={classNames(cls.card, { [cls.max]: max }, [className, cls[variant]])}
		>
			{children}
		</div>
	);
});
