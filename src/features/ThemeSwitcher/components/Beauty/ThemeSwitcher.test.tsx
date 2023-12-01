import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { ThemeSwitcher } from './ThemeSwitcher';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { saveUserSettings } from '@/entities/User/testing';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { ThemeProvider } from '@/app/providers/ThemeProvider/testing';
import { fallbackTheme } from '@/shared/const/theme';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

const component = (
	<ThemeProvider>
		<ThemeSwitcher />
	</ThemeProvider>
);

jest.mock('@/entities/User/model/services/saveUserSettings/saveUserSettings');

describe('ThemeSwitcher.test', () => {
	setFeatureFlags({ isBeautyDesign: true });
	test('Component is rendered', async () => {
		await componentRender(component, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();
		expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBeFalsy();
		expect(fallbackTheme).toBe('app-light-theme');
		expect(document.body).toHaveClass(fallbackTheme);
	});

	test('onChangeTheme', async () => {
		await componentRender(component, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByTestId('ThemeSwitcher'));

		expect(mockDispatch).toHaveBeenCalled();
		expect(saveUserSettings).toHaveBeenCalledWith({ theme: 'app-dark-theme' });
		expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe('app-dark-theme');
		expect(document.body).toHaveClass('app-dark-theme');
	});
});
