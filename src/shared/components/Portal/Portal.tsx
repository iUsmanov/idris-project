import { ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	container?: HTMLElement;
	isMounted?: boolean;
}

export const Portal = memo((props: PortalProps) => {
	const { children, container = null, isMounted = false } = props;

	// Для сторибука
	if (!container) {
		return <>{children}</>;
	}

	if (!isMounted) {
		return null;
	}

	return createPortal(children, container);
});
