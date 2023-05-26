import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/components/Modal/Modal';
import { Button } from '@/shared/components/Button/Button';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
interface NavbarProps {
	className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation();
	const { state: isAuthModalVisible, onModalToggle } = useModal();

	return (
		<div className={classNames(cls.navbar, {}, [className])}>
			<Modal container={document.body} isOpen={isAuthModalVisible} onToggle={onModalToggle}>
				{t('Lorem100')}
			</Modal>
			<div>{t('Articles App')}</div>
			<Button variant='clearInverted' className={cls.login} onClick={onModalToggle}>
				{t('Войти')}
			</Button>
		</div>
	);
};
