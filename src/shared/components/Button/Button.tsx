import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	variant?: ButtonVariant;
	square?: boolean;
	size?: ButtonSize;
}

export type ButtonVariant =
	| 'primary'
	| 'outline'
	| 'clear'
	| 'clearInverted'
	| 'background'
	| 'backgroundInverted';
export type ButtonSize = 'size_m' | 'size_l' | 'size_xl';

export const Button = (props: ButtonProps) => {
	const { className, children, variant = 'primary', square, size = 'size_m', ...otherProps } = props;

	const mods: Mods = {
		[cls.square]: square,
		[cls[size]]: size,
	};
	return (
		<button
			{...otherProps}
			type='button'
			className={classNames(cls.button, mods, [className, cls[variant]])}
		>
			{children}
		</button>
	);
};
