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
import { TestProps } from '@/shared/types/tests';

export type CardVariant = 'primary' | 'outline' | 'light';
export type CardBorder = 'round' | 'normal' | 'high';
export type CardPadding = '0' | '8' | '16' | '24';

type FlexPropsWithotMusor = Omit<FlexProps, 'className' | 'children' | 'max'>;

interface CardBaseBeautyProps extends HTMLAttributes<HTMLDivElement>, TestProps {
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
		['data-testid']: dataTestId = 'Skeleton',
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
			['data-testid']: dataTestId = 'Card',
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
				data-testid={dataTestId}
			>
				{children}
			</Tag>
		);
	}

	return (
		<div
			{...otherProps}
			className={classNames(cls.card, { [cls.max]: max }, additionalClasses)}
			data-testid={dataTestId}
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
