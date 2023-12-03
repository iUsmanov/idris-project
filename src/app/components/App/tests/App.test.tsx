import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { App } from '../App';
import { initAuthData } from '@/entities/User/testing';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

jest.mock('entities/User/model/services/initAuthData/initAuthData');

describe('App.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<App />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('PageLoader')).toBeInTheDocument();
		expect(document.body).toHaveClass('matrix-design app-light-theme');
		expect(mockDispatch).toHaveBeenCalled();
		expect(initAuthData).toHaveBeenCalled();
	});
});
