import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppLink } from './AppLink';
import { screen } from '@testing-library/react';

describe('AppLink.test', () => {
	test('Component is rendered', () => {
		componentRender(<AppLink to='/'>Link</AppLink>);
		const Link = screen.getByTestId('AppLink');

		expect(Link).toBeInTheDocument();
		expect(Link).toHaveClass('primary');
	});

	test('Component has class', () => {
		componentRender(
			<AppLink to='/' variant='outline'>
				Link
			</AppLink>
		);
		const Link = screen.getByTestId('AppLink');

		expect(Link).toBeInTheDocument();
		expect(Link).toHaveClass('outline');
	});

	// JEST & RTL, судя по всему, не предназначены, чтобы писать тесты на роутинг.

	// test('To AboutPage', async () => {
	// 	componentRender(<AppLink to={getRouteAbout()}>Link</AppLink>, {
	// 		route: getRouteMain(),
	// 	});
	// 	const Link = screen.getByTestId('AppLink');
	// 	await userEvent.click(Link);
	// 	await waitFor(() => {
	// 		expect(screen.getByTestId('AboutPage')).toBeInTheDocument();
	// 	});
	// });
});
