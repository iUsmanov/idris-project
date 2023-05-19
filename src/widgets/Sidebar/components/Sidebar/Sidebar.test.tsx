import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { withTranslation } from 'react-i18next';
import { renderWithTranslation } from '@/shared/lib/tests/renderWithTranslation/renderWithTranslation';
import userEvent from '@testing-library/user-event';

describe('Sidebar.test', () => {
	test('Sidebar test', () => {
		const SidebarWithTranslation = withTranslation('translation')(Sidebar);
		render(<SidebarWithTranslation />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});
	test('Sidebar test renderWithTranslation', () => {
		renderWithTranslation(<Sidebar />);
		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
	});
	test('Is sidebar collapsable', async () => {
		renderWithTranslation(<Sidebar />);
		const collapseButton = screen.getByTestId('collapseButton');
		const sidebar = screen.getByTestId('sidebar');

		await userEvent.click(collapseButton);
		expect(sidebar).toHaveClass('collapsed');
	});
	test('Is sidebar collapsable and uncollapseble', async () => {
		renderWithTranslation(<Sidebar />);
		const collapseButton = screen.getByTestId('collapseButton');
		const sidebar = screen.getByTestId('sidebar');

		await userEvent.click(collapseButton);
		expect(sidebar).toHaveClass('collapsed');

		await userEvent.click(collapseButton);
		expect(sidebar).not.toHaveClass('collapsed');
	});
});
