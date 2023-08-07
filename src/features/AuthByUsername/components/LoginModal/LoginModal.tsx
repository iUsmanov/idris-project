import { Suspense, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Modal } from '@/shared/components/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from '@/shared/components/Loader';

interface LoginModalProps {
	className?: string;
	isOpened?: boolean;
	isMounted?: boolean;
	onModalClose?: () => void;
}

export const LoginModal = memo((props: LoginModalProps) => {
	const { className, isOpened, isMounted, onModalClose } = props;

	return (
		<Modal
			className={classNames('', {}, [className])}
			container={document.body}
			isOpened={isOpened}
			isMounted={isMounted}
			onModalClose={onModalClose}
		>
			<Suspense fallback={<Loader size='min' />}>
				<LoginFormAsync isOpened={isOpened} onModalClose={onModalClose} />
			</Suspense>
		</Modal>
	);
});
