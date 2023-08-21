import { ReactNode, memo, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/types/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useUserSettings } from '@/entities/User';
import { defaultTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

export const ThemeProvider = memo((props: ThemeProviderProps) => {
	const { children, initialTheme } = props;
	const { theme: themeFromSettings } = useUserSettings();
	const [isThemeInited, setIsThemeInited] = useState<boolean>(false);

	const [theme, setTheme] = useState<Theme>(initialTheme || themeFromSettings || defaultTheme);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	);

	useEffect(() => {
		if (!isThemeInited && themeFromSettings) {
			setTheme(themeFromSettings);
			setIsThemeInited(true);

			if (document.body.classList.contains('app-light-theme')) {
				document.body.classList.remove('app-light-theme');
			}

			if (document.body.classList.contains('app-dark-theme')) {
				document.body.classList.remove('app-dark-theme');
			}

			if (document.body.classList.contains('app-orange-theme')) {
				document.body.classList.remove('app-orange-theme');
			}

			document.body.classList.add(themeFromSettings);
		}
	}, [isThemeInited, themeFromSettings]);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
});
