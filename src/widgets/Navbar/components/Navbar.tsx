import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { AppLink } from '@/shared/components/AppLink/AppLink';
import { HStack } from '@/shared/components/Stack';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/Counter/Counter';

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
				<Counter className='ds' key={'dsa'} prop1='da' prop2='s' prop3='d' />
			</div>
			<HStack gap='16' className={cls.links}>
				<AppLink to={'/'}>{t('Главная страница')}</AppLink>
				<AppLink to={'/about'}>{t('О сайте')}</AppLink>
			</HStack>
		</div>
	);
};
