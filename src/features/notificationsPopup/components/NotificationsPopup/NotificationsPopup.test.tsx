import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { NotificationsPopup } from './NotificationsPopup';

jest.mock('@/shared/lib/hooks/useModal/useModal', () => ({
	useModal: jest.fn(() => ({
		isOpened: true,
		isMounted: true,
		onMountAndOpen: jest.fn(),
		onUnmountAndClose: jest.fn(),
	})),
}));

describe('NotificationsPopup.test', () => {
	test('Desktop-component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<NotificationsPopup />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Popover')).toBeInTheDocument();
	});
	test('Mobile-component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
		}));
		await componentRender(<NotificationsPopup />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
	});
});
