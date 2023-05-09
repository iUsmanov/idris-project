import { ReactNode, memo } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'inverted';

interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	to: string;
	children: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
	const { variant = 'primary', to, className, children, ...otherProps } = props;

	return (
		<Link {...otherProps} to={to} className={classNames(cls.appLink, {}, [className, cls[variant]])}>
			{children}
		</Link>
	);
});
