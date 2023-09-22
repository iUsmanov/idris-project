import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { HTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';
import {
	FlexProps,
	alignClasses,
	directionClasses,
	gapClasses,
	justifyClasses,
	wrapClasses,
} from '../../Stack';

export type CardVariant = 'primary' | 'outline' | 'light';
export type CardBorder = 'round' | 'normal';
export type CardPadding = '0' | '8' | '16' | '24';

type FlexPropsWithotMusor = Omit<FlexProps, 'className' | 'children' | 'max'>;

interface CardBaseBeautyProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	variant?: CardVariant;
	max?: boolean;
	padding?: CardPadding;
	border?: CardBorder;
}

interface CardNoFlexBeautyProps extends CardBaseBeautyProps {
	flex?: false;
}

interface CardFlexBeautyProps extends CardBaseBeautyProps, FlexPropsWithotMusor {
	flex: true;
}

export type CardBeautyProps = CardNoFlexBeautyProps | CardFlexBeautyProps;

export const Card = memo((props: CardBeautyProps) => {
	const {
		className,
		children,
		max,
		variant = 'primary',
		padding = '8',
		flex,
		border = 'normal',
		...otherProps
	} = props;

	const additionalClasses = [
		className,
		cls[variant],
		cls['padding-' + padding],
		cls['border-' + border],
	];

	if (flex) {
		const {
			className,
			children,
			max,
			flex,
			gap,
			border = 'normal',
			variant = 'primary',
			padding = '8',
			align = 'start',
			justify = 'left',
			direction = 'row',
			wrap = 'nowrap',
			Tag = 'div',
			...otherProps
		} = props;

		return (
			<Tag
				{...otherProps}
				className={classNames(cls.card, { [cls.max]: max }, [
					...additionalClasses,
					cls.flex,
					justifyClasses[justify],
					alignClasses[align],
					directionClasses[direction],
					wrapClasses[wrap],
					gap && gapClasses[gap],
				])}
			>
				{children}
			</Tag>
		);
	}

	return (
		<div {...otherProps} className={classNames(cls.card, { [cls.max]: max }, additionalClasses)}>
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
