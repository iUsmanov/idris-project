import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice';
import { ReactNode, memo } from 'react';

interface MobileViewProps {
	children: ReactNode;
}

export const MobileView = memo((props: MobileViewProps) => {
	const { children } = props;
	const [isMobile] = useDevice();
	if (!isMobile) return null;

	return <>{children}</>;
});
