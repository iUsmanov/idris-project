import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { NotificationsList } from './NotificationsList';
import { useGetNotificationsQuery } from '../../api/notificationsApi';
import { mockNotifications } from '../../mocks';

jest.mock('../../api/notificationsApi', () => ({
	useGetNotificationsQuery: jest.fn(),
}));

const mockedUseGetNotificationsQuery = useGetNotificationsQuery as jest.Mock;

describe('NotificationsList.test', () => {
	test('Component is rendered', async () => {
		mockedUseGetNotificationsQuery.mockReturnValue({});
		await componentRender(<NotificationsList />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('NotificationsList')).toBeInTheDocument();
		expect(mockedUseGetNotificationsQuery).toHaveBeenCalledWith(null, {
			pollingInterval: 5000,
		});
	});

	test('Loading', async () => {
		mockedUseGetNotificationsQuery.mockReturnValue({
			isLoading: true,
		});
		await componentRender(<NotificationsList />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('NotificationsList.IsLoading')).toBeInTheDocument();
		expect(screen.getAllByTestId('Skeleton')).toHaveLength(3);
	});

	test('Data success loaded', async () => {
		mockedUseGetNotificationsQuery.mockReturnValue({
			data: mockNotifications,
		});
		await componentRender(<NotificationsList />, {
			wrapInAct: true,
		});

		screen.debug();
		expect(screen.getByTestId('NotificationsList')).toBeInTheDocument();
		expect(screen.getAllByTestId('NotificationItem')).toHaveLength(4);
	});
});
