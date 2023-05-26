import { ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	container?: HTMLElement;
	keepMounted?: boolean;
}

export const Portal = memo((props: PortalProps) => {
	const { children, container = null } = props;

	// Неплохо было бы удалить модалку из dom, после его закрытия
	// if (!keepMounted) {
	// 	if (children instanceof HTMLElement) {
	// 		console.log('children instanceof HTMLElement');
	// 		document.body.removeChild(children);
	// 	}
	// }

	if (!container) {
		return <>{children}</>;
	}

	return createPortal(children, container);
});
