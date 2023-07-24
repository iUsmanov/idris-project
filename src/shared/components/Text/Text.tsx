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
	tags?: [keyof HTMLElementTagNameMap, keyof HTMLElementTagNameMap] | [keyof HTMLElementTagNameMap];
}

export const Text = memo((props: TextProps) => {
	const {
		className,
		text,
		title,
		variant = 'primary',
		align = 'left',
		size = 'size_s',
		tags = ['p', 'p'],
	} = props;

	const TitleTag = tags[0];
	const TextTag = tags[1] ? tags[1] : 'p';

	return (
		<div className={classNames(cls.text, {}, [className, cls[variant], cls[align], cls[size]])}>
			{title && <TitleTag className={cls.title}>{title}</TitleTag>}
			{text && <TextTag className={cls.text}>{text}</TextTag>}
		</div>
	);
});
