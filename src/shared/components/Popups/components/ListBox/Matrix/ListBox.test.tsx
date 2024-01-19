import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ListBox } from './ListBox';
import { listBoxItems } from '../../../mocks';
import { act } from 'react-dom/test-utils';

const onChange = jest.fn();

describe('ListBox.test', () => {
	test('Component is rendered', async () => {
		await act(async () => {
			componentRender(<ListBox options={listBoxItems} onChange={onChange} />);
		});

		expect(screen.getByTestId('ListBox')).toBeInTheDocument();
		expect(screen.getByTestId('ListBox.Trigger')).toBeInTheDocument();
	});

	test('Label is in the Document', async () => {
		await act(async () => {
			componentRender(<ListBox options={listBoxItems} onChange={onChange} label='label' />);
		});

		expect(screen.getByText('label>')).toBeInTheDocument();
	});

	test('ListBox is disabled', async () => {
		await act(async () => {
			componentRender(<ListBox options={listBoxItems} onChange={onChange} disabled />);
		});

		expect(screen.getByTestId('ListBox.Trigger')).toHaveAttribute('disabled');
	});

	test('ListBox.Trigger has default Value', async () => {
		await act(async () => {
			componentRender(
				<ListBox options={listBoxItems} onChange={onChange} defaultValue='defaultValue' />
			);
		});

		expect(screen.getByTestId('ListBox.Trigger')).toHaveTextContent('defaultValue');
	});
});
