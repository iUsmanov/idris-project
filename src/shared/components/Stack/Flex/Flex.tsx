import { DetailedHTMLProps, HTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

export type FlexJustify = 'left' | 'center' | 'right' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column' | 'rowReverse' | 'columnReverse';
export type FlexGap = '4' | '8' | '16' | '32';

const justifyClasses: Record<FlexJustify, string> = {
	left: cls.justifyLeft,
	center: cls.justifyCenter,
	right: cls.justifyRight,
	between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
	start: cls.alignStart,
	center: cls.alignCenter,
	end: cls.alignEnd,
};

const directionClasses: Record<FlexDirection, string> = {
	row: cls.directionRow,
	column: cls.directionColumn,
	rowReverse: cls.directionRowReverse,
	columnReverse: cls.directionColumnReverse,
};

const gapClasses: Record<FlexGap, string> = {
	4: cls.gap4,
	8: cls.gap8,
	16: cls.gap16,
	32: cls.gap32,
};

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
	className?: string;
	justify?: FlexJustify;
	align?: FlexAlign;
	direction: FlexDirection;
	gap?: FlexGap;
	max?: boolean;
	children: ReactNode;
}

export const Flex = (props: FlexProps) => {
	const {
		className,
		align = 'start',
		justify = 'left',
		direction = 'row',
		gap,
		children,
		max,
		...otherProps
	} = props;

	const classes = [
		className,
		justifyClasses[justify],
		alignClasses[align],
		directionClasses[direction],
		gap && gapClasses[gap],
	];

	const mods: Mods = {
		[cls.max]: max,
	};

	return (
		<div {...otherProps} className={classNames(cls.flex, mods, classes)}>
			{children}
		</div>
	);
};
