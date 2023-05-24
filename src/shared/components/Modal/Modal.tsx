import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Modal.module.scss';

interface ModalProps {
	className?: string;
}

export const Modal = memo((props: ModalProps) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.modal, {}, [className])}>
			<div className={cls.overlay}>
				<div className={cls.modalContent}>{t('Форма авторизации')}</div>
			</div>
		</div>
	);
});
