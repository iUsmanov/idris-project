import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';

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
		</div>
	);
};
