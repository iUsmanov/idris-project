// #store #i18next

import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { RouterProvider } from 'react-router-dom';
import { ReducersObject, StateSchema, StoreProvider } from '@/app/providers/StoreProvider/testing';
import { createMemoryRouter } from 'react-router-dom';
import { routes } from '@/app/providers/router/testing';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from '@/app/providers/ThemeProvider/testing';
import { Theme } from '@/shared/types/theme';
// eslint-disable-next-line fsd-paths-guard/public-api-imports, fsd-paths-guard/hierarchy-imports-between-layers
import '@/app/styles/index.scss';
import { AppDesign } from '@/shared/types/design';

export interface ComponentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersObject>;
	wrapInAct?: boolean;
	theme?: Theme;
	design?: AppDesign;
}

export const componentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
	const { wrapInAct } = options;

	const renderedComponent = render(<TestProvider options={options}>{component}</TestProvider>);

	if (wrapInAct) {
		return act(async () => renderedComponent);
	}

	return renderedComponent;

	// return render(
	// 	<MemoryRouter initialEntries={[route]}>
	// 		<StoreProvider
	// 			initialState={initialState as StateSchema}
	// 			asyncReducers={asyncReducers as ReducersMapObject<StateSchema>}
	// 		>
	// 			<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
	// 		</StoreProvider>
	// 	</MemoryRouter>
	// );
};

interface TestProviderProps {
	children: ReactNode;
	options?: ComponentRenderOptions;
}

/**
 * Я вынес большую часть кода из componentRender в TestProvider, чтобы
 * переиспользовать его(TestProvider) в тестах изолированных компонентов в Cypress.
 *  */
export const TestProvider = (props: TestProviderProps) => {
	const { children, options = {} } = props;
	const {
		route = '/',
		initialState,
		asyncReducers,
		wrapInAct,
		theme = 'app-light-theme',
		design = 'matrix-design',
	} = options;

	document.body.classList.add(design);

	const rootLayout = (
		<StoreProvider
			initialState={initialState as StateSchema}
			asyncReducers={asyncReducers as ReducersObject}
		>
			<I18nextProvider i18n={i18nForTests}>
				<ThemeProvider initialTheme={theme}>
					<div className={`app ${theme}`}>{children}</div>
				</ThemeProvider>
			</I18nextProvider>
		</StoreProvider>
	);

	const rootRoutes = [
		{
			element: rootLayout,
			children: routes,
		},
	];

	const router = createMemoryRouter(rootRoutes, {
		initialEntries: [route],
	});

	return <RouterProvider router={router} />;
};
