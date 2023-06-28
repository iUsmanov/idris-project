import { useContext, useEffect } from 'react';
import { Theme } from '@/shared/types/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { defaultTheme } from '@/shared/const/theme';

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
				newTheme = 'app-dark-theme' as Theme;
		}
		// ! should use optional chaining operator
		setTheme?.(newTheme);
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || 'app-light-theme',
		changeTheme,
	};
}
