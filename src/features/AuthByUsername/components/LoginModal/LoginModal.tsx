import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/components/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
	className?: string;
	isOpened?: boolean;
	isMounted?: boolean;
	onOpenToggle?: (bool: boolean) => void;
	onMountToggle?: (bool: boolean) => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
	const { className, isOpened, onMountToggle, isMounted, onOpenToggle } = props;

	return (
		<Modal
			className={classNames('', {}, [className])}
			container={document.body}
			isOpened={isOpened}
			isMounted={isMounted}
			onOpenToggle={onOpenToggle}
			onMountToggle={onMountToggle}
		>
			<LoginForm isOpened={isOpened} />
		</Modal>
	);
});
