import { ReactNode, forwardRef, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { LinkProps, NavLink } from 'react-router-dom';

export type AppLinkVariant = 'primary' | 'red';

export interface AppLinkBeautyProps extends LinkProps {
	className?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
	activeClassName?: string;
}

export const AppLink = forwardRef((props: AppLinkBeautyProps, ref) => {
	const { variant = 'primary', className, children, activeClassName = '', ...otherProps } = props;

	return (
		<NavLink
			{...otherProps}
			className={({ isActive }) =>
				classNames(cls.appLink, { [activeClassName]: isActive }, [className, cls[variant]])
			}
		>
			{children}
		</NavLink>
	);
});

const AppLinkAsync = memo((props: AppLinkBeautyProps) => {
	const { isLoaded, AppLink } = useBeautySharedComponents();

	if (!isLoaded) return null;

	return <AppLink {...props} />;
});

export const AppLinkBeauty = (props: AppLinkBeautyProps) => {
	return (
		<BeautySharedProvider>
			<AppLinkAsync {...props} />
		</BeautySharedProvider>
	);
};
