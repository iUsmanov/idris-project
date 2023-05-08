import { useContext, useEffect } from 'react';
import { Theme } from '../../../types/theme';
import { ThemeContext } from '../../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { defaultTheme } from '../../../const/theme';

interface UseThemeResult {
	theme: Theme;
	changeTheme: () => void;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	useEffect(() => {
		document.body.classList.add(defaultTheme);
	}, []);

	const changeTheme = () => {
		let newTheme;
		switch (theme) {
			case 'app_light_theme':
				document.body.classList.remove(theme);
				newTheme = 'app_dark_theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			case 'app_dark_theme':
				document.body.classList.remove(theme);
				newTheme = 'app_orange_theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			case 'app_orange_theme':
				document.body.classList.remove(theme);
				newTheme = 'app_light_theme' as Theme;
				document.body.classList.add(newTheme);
				break;
			default:
				newTheme = 'app_dark_theme' as Theme;
		}
		// ! should use optional chaining operator
		setTheme?.(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || ('app_light_theme' as Theme),
		changeTheme,
	};
}
