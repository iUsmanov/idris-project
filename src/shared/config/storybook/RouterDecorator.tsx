// #router
/**
 * RouterDecorator предназначен для того, чтобы мы могли рендерить наш
 * компонент на определённой странице. Это нужно, например, если мы
 * в нашем компоненте используем следующую запись `const { id } = useParams<{ id: string }>();`.
 *
 * */

import { StoryContext, StoryFn } from '@storybook/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

export const RouterDecorator = (Story: StoryFn, context: StoryContext) => {
	// const router = createBrowserRouter([
	// 	{
	// 		element: <Story />,
	// 	},
	// ]);

	// return <RouterProvider router={router} />;

	if (!context.parameters.router) {
		return (
			<BrowserRouter>
				<Story />
			</BrowserRouter>
		);
	}

	const { parameters } = context;

	const { path, route } = parameters.router;

	return (
		<MemoryRouter initialEntries={[encodeURI(route)]}>
			<Routes>
				<Route path={path} element={<Story />} />
			</Routes>
		</MemoryRouter>
	);
};
