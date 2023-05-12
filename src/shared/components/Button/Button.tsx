import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	variant?: ButtonVariant;
}

export type ButtonVariant = 'primary' | 'secondary' | 'clear';

export const Button = memo((props: ButtonProps) => {
	const { className, children, variant = 'primary', ...otherProps } = props;

	return (
		<button
			{...otherProps}
			type='button'
			className={classNames(cls.button, {}, [className, cls[variant]])}
		>
			{children}
		</button>
	);
});
