import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { NotificationItem } from './NotificationItem';
import { mockNotification } from '../../../mocks';
import { getRouteMain } from '@/shared/const/router';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('NotificationItem.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<NotificationItem item={mockNotification} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('NotificationItem')).toBeInTheDocument();
		expect(screen.getByText(mockNotification.title)).toBeInTheDocument();
		expect(screen.getByText(mockNotification.description)).toBeInTheDocument();
	});

	test('Component is wrapped in link', async () => {
		const notificationWithHref = { ...mockNotification, href: getRouteMain() };
		await componentRender(<NotificationItem item={notificationWithHref} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Link')).toBeInTheDocument();
	});
});
