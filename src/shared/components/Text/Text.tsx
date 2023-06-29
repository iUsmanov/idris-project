import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'inverted';
export type TextAling = 'left' | 'center' | 'right';
export type TextSize = 'size_s' | 'size_m' | 'size_l';

interface TextProps {
	className?: string;
	text?: string;
	title?: string;
	variant?: TextVariant;
	align?: TextAling;
	size?: TextSize;
}

export const Text = memo((props: TextProps) => {
	const { className, text, title, variant = 'primary', align = 'left', size = 'size_s' } = props;

	return (
		<div className={classNames(cls.text, {}, [className, cls[variant], cls[align], cls[size]])}>
			{title && <p className={cls.title}>{title}</p>}
			{text && <p className={cls.text}>{text}</p>}
		</div>
	);
});
