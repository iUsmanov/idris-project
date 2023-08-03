import { ReactNode, memo } from 'react';
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';

interface DesktopViewProps {
	children: ReactNode;
}

export const DesktopView = memo((props: DesktopViewProps) => {
	const { children } = props;
	const [isMobile] = useDevice();
	if (isMobile) return null;

	return <>{children}</>;
});
