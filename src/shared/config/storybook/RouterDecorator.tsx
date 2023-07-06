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
