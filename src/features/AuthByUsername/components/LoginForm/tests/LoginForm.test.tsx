import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { LoginForm } from '../LoginForm';
import { screen } from '@testing-library/react';
import { loginReducer } from '../../../testing';
import { userEvent } from '@testing-library/user-event';
import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { loginActions } from '../../../model/slice/loginSlice';
import { getAction } from './helpers';
// Это не работает
// jest.mock('../../model/services/loginByUsername/loginByUsername', () => ({
// 	...jest.requireActual('../../model/services/loginByUsername/loginByUsername'),
// 	loginByUsername: mockLoginByUsername,
// }));

const mockDispatch = jest.fn(() => getAction('fulfilled'));
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
	test('Component is rendered', async () => {
		await componentRender(<LoginForm />, {
			wrapInAct: true,
			initialState: {
				loginForm: {
					username: 'admin',
					password: '123',
				},
			},
			asyncReducers: {
				loginForm: loginReducer,
			},
		});

		const inputs = screen.getAllByTestId('Input');
		expect(screen.getByTestId('LoginForm')).toBeInTheDocument();
		expect(inputs).toHaveLength(2);
		expect(screen.getByTestId('Button')).toBeInTheDocument();
		expect(screen.getByText('Форма авторизации')).toBeInTheDocument();
		expect(inputs[0]).toHaveValue('admin');
		expect(inputs[0]).not.toHaveFocus();
		expect(inputs[1]).toHaveValue('123');
	});

	test('Error', async () => {
		await componentRender(<LoginForm />, {
			wrapInAct: true,
			initialState: {
				loginForm: {
					error: 'error',
				},
			},
			asyncReducers: {
				loginForm: loginReducer,
			},
		});

		expect(screen.getByText('Вы ввели неверный логин или пароль')).toBeInTheDocument();
	});

	test('IsLoading', async () => {
		await componentRender(<LoginForm />, {
			wrapInAct: true,
			initialState: {
				loginForm: {
					isLoading: true,
				},
			},
			asyncReducers: {
				loginForm: loginReducer,
			},
		});

		expect(screen.getByTestId('Button')).toBeDisabled();
	});

	test('Autofocus', async () => {
		await componentRender(<LoginForm isOpened={true} />, {
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

		const inputs = screen.getAllByTestId('Input');
		expect(inputs[0]).toHaveFocus();
	});

	test('loginActions', async () => {
		const mockSetUsername = jest.fn();
		const mockSetPassword = jest.fn();
		jest.spyOn(loginActions, 'setUsername').mockImplementation(mockSetUsername);
		jest.spyOn(loginActions, 'setPassword').mockImplementation(mockSetPassword);
		await componentRender(<LoginForm isOpened={true} />, {
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

		const inputs = screen.getAllByTestId('Input');

		await userEvent.type(inputs[0], 'admin');
		await userEvent.type(inputs[1], '123');

		expect(mockSetUsername).toHaveBeenLastCalledWith('n');
		expect(mockSetPassword).toHaveBeenLastCalledWith('3');
		expect(mockDispatch).toHaveBeenCalledTimes(8);
	});

	test('Cliked on button and thunk returned `fulfilled`', async () => {
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
		expect(onModalClose).toHaveBeenCalled();
		expect(mockReload).toHaveBeenCalled();
	});
});
