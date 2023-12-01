import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { getAction } from './helpers';
import { LoginForm } from '../LoginForm';
import { loginReducer } from '../../../model/slice/loginSlice';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';

const mockDispatch = jest.fn(() => getAction('rejected'));
const mockReload = jest.fn();
const onModalClose = jest.fn();

Object.defineProperty(window, 'location', {
	configurable: true,
	value: { reload: mockReload },
});

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

jest.mock('../../../model/services/loginByUsername/loginByUsername');

describe('LoginForm.test', () => {
	test('Cliked on button and thunk returned `rejected`', async () => {
		await componentRender(<LoginForm onModalClose={onModalClose} />, {
			wrapInAct: true,
			initialState: {
				loginForm: {
					username: '',
					password: '',
				},
			},
			asyncReducers: {
				loginForm: loginReducer,
			},
		});

		await userEvent.click(screen.getByTestId('Button'));

		expect(mockDispatch).toHaveBeenCalled();
		expect(loginByUsername).toHaveBeenCalled();
		expect(onModalClose).not.toHaveBeenCalled();
		expect(mockReload).not.toHaveBeenCalled();
	});
});
