import 'whatwg-fetch';
import { screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { withTranslation } from 'react-i18next';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import userEvent from '@testing-library/user-event';

describe('Sidebar.test', () => {
	test('Sidebar test', () => {
		const SidebarWithTranslation = withTranslation('translation')(Sidebar);
		componentRender(<SidebarWithTranslation />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});
	test('Sidebar test componentRender', () => {
		componentRender(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});
	test('Is sidebar collapsable', async () => {
		componentRender(<Sidebar />);
		const collapseButton = screen.getByTestId('collapseButton');
		const sidebar = screen.getByTestId('sidebar');

		await userEvent.click(collapseButton);
		expect(sidebar).toHaveClass('collapsed');
	});
	test('Is sidebar collapsable and uncollapseble', async () => {
		componentRender(<Sidebar />);
		const collapseButton = screen.getByTestId('collapseButton');
		const sidebar = screen.getByTestId('sidebar');

		await userEvent.click(collapseButton);
		expect(sidebar).toHaveClass('collapsed');

		await userEvent.click(collapseButton);
		expect(sidebar).not.toHaveClass('collapsed');
	});
});
