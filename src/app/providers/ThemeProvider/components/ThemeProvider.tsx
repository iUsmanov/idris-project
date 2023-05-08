import { FC, ReactNode, useMemo, useState } from 'react';
import { ThemeContext, ThemeContextProps } from '../../../../shared/lib/context/ThemeContext';
import { Theme } from '../../../../shared/types/theme';
import { defaultTheme } from '../../../../shared/const/theme';

interface ThemeProviderProps {
	initialTheme?: Theme;
	children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
	const { children, initialTheme } = props;

	const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

	const defaultProps = useMemo(
		() => ({
			theme,
			setTheme,
		}),
		[theme]
	);

	return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};
