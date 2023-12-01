import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { NotificationsDrawer } from './NotificationsDrawer';
import { userEvent } from '@testing-library/user-event';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('NotificationsDrawer.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Drawer is closed', async () => {
		await componentRender(<NotificationsDrawer />, {
			wrapInAct: true,
		});

		expect(screen.queryByTestId('NotificationsList')).toBeNull();
		expect(screen.queryByTestId('Drawer')).toBeNull();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	test('Drawer is opened', async () => {
		await componentRender(<NotificationsDrawer />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByRole('button'));

		expect(screen.getByTestId('NotificationsList')).toBeInTheDocument();
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
	});
});
