import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { mockUser, userReducer } from '@/entities/User/testing';
import { AvatarDropdown } from './AvatarDropdown';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('AvatarDropdown.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<AvatarDropdown />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
			asyncReducers: {
				user: userReducer,
			},
		});

		expect(screen.getByTestId('AvatarDropdown')).toBeInTheDocument();
		expect(screen.getByTestId('Avatar')).toBeInTheDocument();
	});
});
