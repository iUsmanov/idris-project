import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { SidebarItem } from './SidebarItem';
import { mockUser } from '@/entities/User/testing';
import { mockSidebarItem } from '../../../mocks';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('SidebarItem.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<SidebarItem item={mockSidebarItem} />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('SidebarItem')).toBeInTheDocument();
		expect(screen.getByText(mockSidebarItem.text)).toBeInTheDocument();
		expect(screen.getByText(mockSidebarItem.text).parentElement).toHaveClass('justifyLeft');
	});

	test('Component is collapsed', async () => {
		await componentRender(<SidebarItem item={mockSidebarItem} collapsed />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('SidebarItem')).toHaveClass('collapsed');
		expect(screen.getByText(mockSidebarItem.text).parentElement).toHaveClass('justifyCenter');
	});

	test('Item for only authed users is not available for all users', async () => {
		await componentRender(<SidebarItem item={{ ...mockSidebarItem, authOnly: true }} />, {
			wrapInAct: true,
		});

		expect(screen.queryByTestId('SidebarItem')).toBeNull();
	});
});
