import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Drawer } from './Drawer';
import { act } from 'react-dom/test-utils';
import { userEvent } from '@testing-library/user-event';

const wrapper = <div className='wrapper'></div>;
const drawerContent = 'Drawer content';

describe('Drawer.test', () => {
	test('Component is rendered', async () => {
		await act(async () => {
			componentRender(<Drawer>{drawerContent}</Drawer>);
		});
		expect(screen.getByText(drawerContent)).toBeInTheDocument();
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
	});

	test('Component is rendered', async () => {
		await act(async () => {
			componentRender(<Drawer isOpened>{drawerContent}</Drawer>);
		});

		const DrawerComponent = screen.getByTestId('Drawer');
		const DrawerContentDiv = screen.getByText(drawerContent);

		expect(DrawerComponent).toBeInTheDocument();
		expect(DrawerComponent).toHaveClass('opened');
		expect(DrawerContentDiv).toBeInTheDocument();
		expect(DrawerContentDiv).toHaveClass('drawerContent');
	});

	test('If container is defined, Drawer is not is DOM', async () => {
		await act(async () => {
			componentRender(<Drawer container={wrapper as any}>{drawerContent}</Drawer>);
		});
		expect(screen.queryByTestId('Drawer')).toBeNull();
	});

	test('Close drawer by mouse click', async () => {
		const onDrawerClose = jest.fn();
		await act(async () => {
			componentRender(<Drawer onDrawerClose={onDrawerClose}>{drawerContent}</Drawer>);
		});

		const overlay = screen.getByTestId('Drawer.Overlay');

		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
		expect(overlay).toBeInTheDocument();

		await userEvent.click(overlay);

		expect(onDrawerClose).toHaveBeenCalled();
	});
});
