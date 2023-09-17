import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'primary' | 'outline';
export type CardPadding = '0' | '8' | '16' | '24';

export interface CardBeautyProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
	padding?: CardPadding;
}

export const Card = memo((props: CardBeautyProps) => {
	const { className, children, max, variant = 'primary', padding = '8', ...otherProps } = props;

	return (
		<div
			{...otherProps}
			className={classNames(cls.card, { [cls.max]: max }, [
				className,
				cls[variant],
				cls['padding-' + padding],
			])}
		>
			{children}
		</div>
	);
});

const CardAsync = (props: CardBeautyProps) => {
	const { isLoaded, Card } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <Card {...props} />;
};

export const CardBeauty = (props: CardBeautyProps) => {
	return (
		<BeautySharedProvider>
			<CardAsync {...props} />
		</BeautySharedProvider>
	);
};
