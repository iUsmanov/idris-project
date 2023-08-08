// ThemeProvider импортируется из высшего слоя, что плохо
// Не вижу смысла i18n для storybook
import { ThemeProvider } from '@/app/providers/ThemeProvider/testing';
import { Theme } from '@/shared/types/theme';
import { StoryContext, StoryFn } from '@storybook/react';

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
