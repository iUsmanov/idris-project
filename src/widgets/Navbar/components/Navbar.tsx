import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { HStack } from '@/shared/components/Stack';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';

interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<div>
				<h1>{t('Войти')}</h1>
			</div>
			<HStack gap='16' className={cls.links}>
				<AppLink to={'/'}>MainPage</AppLink>
				<AppLink to={'/about'}>AboutPage</AppLink>
			</HStack>
		</div>
	);
};
