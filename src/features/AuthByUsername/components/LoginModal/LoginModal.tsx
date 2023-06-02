import { Dispatch, SetStateAction, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { Modal } from '@/shared/components/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
	className?: string;
	isOpen?: boolean;
	onToggle?: VoidFunction;
	keepMounted?: boolean;
	setKeepMounted?: Dispatch<SetStateAction<boolean>>;
}

export const LoginModal = memo((props: LoginModalProps) => {
	const { className, isOpen, onToggle, keepMounted, setKeepMounted } = props;

	return (
		<Modal
			container={document.body}
			isOpen={isOpen}
			onToggle={onToggle}
			keepMounted={keepMounted}
			setKeepMounted={setKeepMounted}
			className={classNames(cls.loginModal, {}, [className])}
		>
			<LoginForm isOpen={isOpen} />
		</Modal>
	);
});
