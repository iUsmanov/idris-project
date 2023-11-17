import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Select } from './Select';
import { selectItems } from './testing';

describe('Select.test', () => {
	test('Component is rendered', async () => {
		componentRender(<Select options={selectItems} />);

		const select = screen.getByTestId('Select');

		expect(select).toBeInTheDocument();
		expect(screen.getByTestId('Select.Select')).toBeInTheDocument();
		expect(screen.getAllByTestId('Select.Item')[0]).toBeInTheDocument();
	});

	test('Component has label', async () => {
		componentRender(<Select options={selectItems} label='label' />);

		expect(screen.getByText('label>')).toBeInTheDocument();
	});

	test('Component is disabled', async () => {
		componentRender(<Select options={selectItems} label='label' disabled />);

		expect(screen.getByText('label>')).toHaveClass('disabled');
		expect(screen.getByTestId('Select.Select')).toBeDisabled();
	});
});
