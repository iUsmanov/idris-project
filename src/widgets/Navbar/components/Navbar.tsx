import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { HStack } from '@/shared/components/Stack';

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
	const { className } = props;

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<HStack gap='16' className={cls.links}>
				<AppLink to={'/'}>MainPage</AppLink>
				<AppLink to={'/about'}>AboutPage</AppLink>
			</HStack>
		</div>
	);
};
