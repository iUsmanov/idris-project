// #store
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import { RouterProvider } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider/testing';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createMemoryRouter } from 'react-router-dom';
import { routes } from '@/app/providers/router/testing';

export interface ComponentRenderOptions {
	route?: string;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const componentRender = (component: ReactNode, options: ComponentRenderOptions = {}) => {
	const { route = '/', initialState, asyncReducers } = options;

	const rootLayout = (
		<StoreProvider
			initialState={initialState as StateSchema}
			asyncReducers={asyncReducers as ReducersMapObject<StateSchema>}
		>
			<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
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

	return render(<RouterProvider router={router} />);

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
