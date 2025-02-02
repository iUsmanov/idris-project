import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { LangSwitcher } from './LangSwitcher';
import { userEvent } from '@testing-library/user-event';
import i18next from 'i18next';

describe('LangSwitcher.test', () => {
	test('Component is rendered. Not profile of this user', async () => {
		await componentRender(<LangSwitcher />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('LangSwitcher')).toHaveTextContent('Язык');
	});
	test('Component is rendered. Not profile of this user', async () => {
		await componentRender(<LangSwitcher short />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('LangSwitcher')).toHaveTextContent('Короткий язык');
	});

	test('Component is rendered. Not profile of this user', async () => {
		await componentRender(<LangSwitcher />, {
			wrapInAct: true,
		});

		const button = screen.getByTestId('LangSwitcher');

		expect(i18next.language).toBe('ru');

		await userEvent.click(button);
		expect(i18next.language).toBe('en');

		await userEvent.click(button);
		expect(i18next.language).toBe('ru');

		await userEvent.click(button);
		expect(i18next.language).toBe('en');
	});
});
