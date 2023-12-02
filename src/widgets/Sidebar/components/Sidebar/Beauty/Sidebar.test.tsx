import { screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@testing-library/user-event';
import { mockUser } from '@/entities/User/testing';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

describe('Sidebar.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(<Sidebar />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('Sidebar')).toBeInTheDocument();
		expect(screen.getByTestId('Switchers')).toHaveClass('directionRow');
		// expect(screen.getByTestId('CollapseButton')).toHaveTextContent('<');
		expect(screen.getAllByTestId('SidebarItem')).toHaveLength(2);
		expect(screen.getByTestId('LangSwitcher')).toHaveTextContent('Язык');
		expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();
	});
	test('User is authed', async () => {
		await componentRender(<Sidebar />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getAllByTestId('SidebarItem')).toHaveLength(4);
	});
	test('Is sidebar collapsable', async () => {
		await componentRender(<Sidebar />, {
			wrapInAct: true,
		});

		const collapseButton = screen.getByTestId('CollapseButton');
		const sidebar = screen.getByTestId('Sidebar');

		await userEvent.click(collapseButton);

		expect(screen.getByTestId('LangSwitcher')).toHaveTextContent('Короткий язык');
		expect(sidebar).toHaveClass('collapsed');
		// expect(collapseButton).toHaveTextContent('>');
		expect(screen.getByTestId('Switchers')).toHaveClass('directionColumn');
	});
	test('Is sidebar collapsable and uncollapseble', async () => {
		await componentRender(<Sidebar />, {
			wrapInAct: true,
		});
		const collapseButton = screen.getByTestId('CollapseButton');
		const sidebar = screen.getByTestId('Sidebar');
		const langSwitcher = screen.getByTestId('LangSwitcher');
		const switchers = screen.getByTestId('Switchers');

		await userEvent.click(collapseButton);

		expect(sidebar).toHaveClass('collapsed');
		expect(langSwitcher).toHaveTextContent('Короткий язык');
		// expect(collapseButton).toHaveTextContent('>');
		expect(switchers).toHaveClass('directionColumn');

		await userEvent.click(collapseButton);

		expect(sidebar).not.toHaveClass('collapsed');
		expect(langSwitcher).toHaveTextContent('Язык');
		// expect(collapseButton).toHaveTextContent('<');
		expect(switchers).toHaveClass('directionRow');
	});
});
