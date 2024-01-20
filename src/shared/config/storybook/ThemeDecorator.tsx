/**
 * ThemeDecorator предназначен для того, чтобы обернуть стори-кейс
 * в ThemeProvider, навешивать определённые классы тем. В общем, нужен
 * для того, чтобы работали темы в стори-кейсах.
 *
 * */

// #theme
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
! Самый актуальный
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

*/

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

	const [thisTheme, setThisTheme] = useState<Theme>();
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

	useEffect(() => {
		if (isFirstRender) {
			setThisTheme(defaultTheme);
			setIsFirstRender(false);
			console.log('That was first Render');
		}
		setThisTheme(themeFromContext);
		console.log('That was NOT first Render');
	}, [defaultTheme, isFirstRender, themeFromContext]);

	return (
		<ThemeProvider initialTheme={thisTheme}>
			<div className={`app ${thisTheme}`}>
				<Story />
			</div>
		</ThemeProvider>
	);
};

*/
