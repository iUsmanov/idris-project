import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Popover } from './Popover';
import { act } from 'react-dom/test-utils';

const trigger = <div>trigger</div>;
const children = <div>children</div>;

describe('Popover.test', () => {
	test('Component is rendered', async () => {
		await act(async () => {
			componentRender(<Popover trigger={trigger}>{children}</Popover>);
		});

		expect(screen.getByTestId('Popover')).toBeInTheDocument();
		expect(screen.getByTestId('Popover.Trigger')).toBeInTheDocument();
	});
});
