// ThemeProvider импортируется из высшего слоя, что плохо
// Не вижу смысла i18n для storybook
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/types/theme';
import { StoryContext, StoryFn } from '@storybook/react';
import { useEffect } from 'react';

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn, context: StoryContext) => {
	// const { theme } = context.globals;

	// const { theme } = useTheme();

	// let thisTheme;

	// useEffect(() => {
	// 	thisTheme = theme;
	// }, [theme]);

	return (
		<ThemeProvider initialTheme={theme}>
			<div className={`app ${theme}`}>
				<Story />
			</div>
		</ThemeProvider>
	);
};
