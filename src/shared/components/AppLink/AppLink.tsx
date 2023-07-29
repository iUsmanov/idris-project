import { ReactNode, forwardRef, memo } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Link, LinkProps } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'inverted' | 'red' | 'outline';

interface AppLinkProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
}

const AppLink = forwardRef((props: AppLinkProps, ref) => {
	const { variant = 'primary', className, children, ...otherProps } = props;

	return (
		<Link {...otherProps} className={classNames(cls.appLink, {}, [className, cls[variant]])}>
			{children}
		</Link>
	);
});

const MemoizedAppLink = memo(AppLink);

export { MemoizedAppLink as AppLink };
