import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { NotificationsDrawer } from './NotificationsDrawer';
import { userEvent } from '@testing-library/user-event';

describe('NotificationsDrawer.test', () => {
	test('Drawer is closed', async () => {
		await componentRender(<NotificationsDrawer />, {
			wrapInAct: true,
		});

		expect(screen.queryByTestId('NotificationsList')).toBeNull();
		expect(screen.queryByTestId('Drawer')).toBeNull();
		expect(screen.getByTestId('Button')).toBeInTheDocument();
	});
	test('Drawer is opened', async () => {
		await componentRender(<NotificationsDrawer />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByTestId('Button'));

		expect(screen.getByTestId('NotificationsList')).toBeInTheDocument();
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
	});
});
