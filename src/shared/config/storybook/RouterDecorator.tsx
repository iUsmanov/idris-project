import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (Story: StoryFn) => {
	// const router = createBrowserRouter([
	// 	{
	// 		element: <Story />,
	// 	},
	// ]);

	// return <RouterProvider router={router} />;
	return (
		<BrowserRouter>
			<Story />
		</BrowserRouter>
	);
};
