import { ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	container?: HTMLElement;
	keepMounted?: boolean;
}

export const Portal = memo((props: PortalProps) => {
	const { children, container = null, keepMounted = false } = props;

	// Для сторибука
	if (!container) {
		return <>{children}</>;
	}

	if (!keepMounted) {
		return null;
	}

	return createPortal(children, container);
});
