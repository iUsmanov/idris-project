// #theme
import { useContext } from 'react';
import { Theme } from '@/shared/types/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { fallbackTheme } from '@/shared/const/theme';

interface UseThemeResult {
	theme: Theme;
	changeTheme: (saveAction?: (theme: Theme) => void) => void;
}

// В моём случае, в принципе можно было не сохронять тему в локал-сторадж,
// потому что лоадер и так нормально работает.
// Ещё надо было бы и выбранный дизайн в локал-сторадж сохронять, но лоадер и так работает,
// хотя я не понимаю, почему ?

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	const changeTheme = (saveAction?: (theme: Theme) => void) => {
		let newTheme;
		switch (theme) {
			case 'app-light-theme':
				document.body.classList.remove(theme);
				newTheme = 'app-dark-theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			case 'app-dark-theme':
				document.body.classList.remove(theme);
				newTheme = 'app-orange-theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			case 'app-orange-theme':
				document.body.classList.remove(theme);
				newTheme = 'app-light-theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			default:
				newTheme = fallbackTheme;
		}

		setTheme?.(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);

		saveAction?.(newTheme);
	};

	return {
		theme: theme || fallbackTheme,
		changeTheme,
	};
}
