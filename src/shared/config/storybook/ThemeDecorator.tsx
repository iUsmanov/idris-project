// Не вижу смысла i18n для storybook
import { ThemeProvider } from '@/app/providers/ThemeProvider/testing';
import { Theme } from '@/shared/types/theme';
import { StoryContext, StoryFn } from '@storybook/react';

export const ThemeDecorator = (defaultTheme: Theme) => (Story: StoryFn, context: StoryContext) => {
	const themeFromContext = context.globals.theme;

	return (
		<ThemeProvider initialTheme={themeFromContext ?? defaultTheme}>
			<div className={`app ${themeFromContext ?? defaultTheme}`}>
				<Story />
			</div>
		</ThemeProvider>
	);
};

/* 

export const ThemeDecorator = (defaultTheme: Theme) => (Story: StoryFn, context: StoryContext) => {
	const themeFromContext = context.globals.theme;

	return (
		<ThemeWrapper Story={Story} themeFromContext={themeFromContext} defaultTheme={defaultTheme} />
	);
};

interface ThemeWrapperProps {
	defaultTheme: Theme;
	Story: StoryFn;
	themeFromContext: Theme;
}

export const ThemeWrapper = (props: ThemeWrapperProps) => {
	const { Story, themeFromContext, defaultTheme } = props;

	// Неудачная попытка сделать так, чтобы при переключении сторисов в запущенном сторибуке
	// тема сбрасывалась на дефолтную для этой конкретной сторис.
	// Это возможно, но тогда в навбаре ну будет показано, что теперь тема другая
	// потому, что тема которая прилетает из контекста является константой.

	// const [thisTheme, setThisTheme] = useState<Theme>();

	// useEffect(() => {
	// 	setThisTheme(themeFromContext);
	// }, [themeFromContext]);

	// useEffect(() => {
	// 	setThisTheme(defaultTheme);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<ThemeProvider initialTheme={themeFromContext ?? defaultTheme}>
			<div className={`app ${themeFromContext ?? defaultTheme}`}>
				<Story />
			</div>
		</ThemeProvider>
	);
};


*/
