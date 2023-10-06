import { ReactNode, memo, useEffect, useMemo, useState } from 'react';
import { Theme } from '@/shared/types/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { useUserSettings } from '@/entities/User';
import { fallbackTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

export const ThemeProvider = memo((props: ThemeProviderProps) => {
	const { children, initialTheme } = props;
	const { theme: themeFromSettings } = useUserSettings();
	const [isThemeInited, setIsThemeInited] = useState<boolean>(false);
	const [theme, setTheme] = useState<Theme>(initialTheme || themeFromSettings || fallbackTheme);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	);

	useEffect(() => {
		if (!isThemeInited) {
			setTheme(theme);
			setIsThemeInited(true);

			document.body.classList.add(theme);
		}
	}, [isThemeInited, theme]);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
});
