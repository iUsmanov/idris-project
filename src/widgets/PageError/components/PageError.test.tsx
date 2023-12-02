import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { PageError } from './PageError';
import { userEvent } from '@testing-library/user-event';

const mockReload = jest.fn();
Object.defineProperty(window, 'location', {
	configurable: true,
	value: { reload: mockReload },
});

describe('PageError.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<PageError />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageError')).toBeInTheDocument();
		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
		expect(screen.getByText('Обновить страницу')).toBeInTheDocument();
	});

	test('Reload page', async () => {
		await componentRender(<PageError />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByText('Обновить страницу'));

		expect(mockReload).toHaveBeenCalled();
	});
});
