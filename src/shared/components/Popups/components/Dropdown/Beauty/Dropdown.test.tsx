import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Dropdown } from './Dropdown';
import { dropdownItems } from '../../../mocks';

const trigger = <div>trigger</div>;

describe('Dropdown.test', () => {
	test('Component is rendered', async () => {
		componentRender(<Dropdown items={dropdownItems} trigger={trigger} />);

		expect(screen.getByTestId('Dropdown')).toBeInTheDocument();
		expect(screen.getByTestId('Dropdown.Trigger')).toBeInTheDocument();
	});
});
