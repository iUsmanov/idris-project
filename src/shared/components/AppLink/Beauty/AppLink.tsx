import { ReactNode, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {
	BeautySharedProvider,
	useBeautySharedComponents,
} from '@/shared/lib/components/BeautySharedProvider/BeautySharedProvider';
import { LinkProps, NavLink } from 'react-router-dom';
import { TestProps } from '@/shared/types/tests';

export type AppLinkVariant = 'primary' | 'red' | 'outline';

export interface AppLinkBeautyProps extends LinkProps, TestProps {
	className?: string;
	variant?: AppLinkVariant;
	children: ReactNode;
	activeClassName?: string;
}

export const AppLink = memo((props: AppLinkBeautyProps) => {
	const {
		variant = 'primary',
		className,
		children,
		activeClassName = '',
		['data-testid']: dataTestId = 'AppLink',
		...otherProps
	} = props;

	return (
		<NavLink
			{...otherProps}
			className={({ isActive }) =>
				classNames(cls.appLink, { [activeClassName]: isActive }, [className, cls[variant]])
			}
			data-testid={dataTestId}
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
