import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { LoginModal } from '@/features/AuthByUsername';
interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation();
	const {
		state: isAuthModalVisible,
		onModalToggle,
		keepMounted,
		mountAndOpen,
		setKeepMounted,
	} = useModal();

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<LoginModal
				isOpen={isAuthModalVisible}
				onToggle={onModalToggle}
				keepMounted={keepMounted}
				setKeepMounted={setKeepMounted}
			/>
			<div>{t('Articles App')}</div>
			<Button variant='clearInverted' className={cls.login} onClick={mountAndOpen}>
				{t('Войти')}
			</Button>
		</div>
	);
};
