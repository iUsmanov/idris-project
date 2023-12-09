import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { mockUser } from '@/entities/User/testing';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { mockProfile } from '@/entities/Profile/testing';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { mockProfileValidateErrors } from '../../mocks';
import { userEvent } from '@testing-library/user-event';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

const mockDispatch = jest.fn();
const mockCancelEdit = jest.fn();
const mockSetReadonly = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

jest.mock('../../model/services/updateProfileData/updateProfileData');

describe('EditableProfileCardHeader.test', () => {
	test('Component is rendered. Not profile of this user', async () => {
		await componentRender(<EditableProfileCardHeader />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: { ...mockProfile, id: '2' },
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		expect(screen.getByTestId('EditableProfileCardHeader')).toBeInTheDocument();
		expect(screen.getByText('Профиль')).toBeInTheDocument();
	});

	test('ProfileValidateErrors', async () => {
		await componentRender(
			<EditableProfileCardHeader profileValidateErrors={mockProfileValidateErrors} />,
			{
				wrapInAct: true,
				initialState: {
					user: {
						authData: mockUser,
					},
					profile: {
						data: { ...mockProfile, id: '2' },
					},
				},
				asyncReducers: {
					profile: profileReducer,
				},
			}
		);

		expect(screen.getByTestId('EditableProfileCardHeader')).toBeInTheDocument();
		expect(screen.getAllByTestId('EditableProfileCardHeader.ErrorText')).toHaveLength(
			mockProfileValidateErrors.length
		);
		mockProfileValidateErrors.forEach((textErr) => {
			expect(screen.getByText(textErr)).toBeInTheDocument();
		});
	});

	test('Profile of this user', async () => {
		await componentRender(<EditableProfileCardHeader />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		expect(screen.getByTestId('EditableProfileCardHeader')).toBeInTheDocument();
		expect(screen.queryByTestId('EditableProfileCardHeader.EditButton')).toBeNull();
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
		expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument();
	});

	test('Profile of this user. With readonly', async () => {
		await componentRender(<EditableProfileCardHeader readonly />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		expect(screen.getByTestId('EditableProfileCardHeader')).toBeInTheDocument();
		expect(screen.getByTestId('EditableProfileCardHeader.EditButton')).toBeInTheDocument();
		expect(screen.queryByTestId('EditableProfileCardHeader.CancelButton')).toBeNull();
		expect(screen.queryByTestId('EditableProfileCardHeader.SaveButton')).toBeNull();
	});

	test('Call updateProfileData', async () => {
		await componentRender(<EditableProfileCardHeader />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
		expect(mockDispatch).toHaveBeenCalled();
		expect(updateProfileData).toHaveBeenCalled();
	});

	test('Call profileActions.cancelEdit', async () => {
		jest.spyOn(profileActions, 'cancelEdit').mockImplementation(mockCancelEdit);
		await componentRender(<EditableProfileCardHeader />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockCancelEdit).toHaveBeenCalled();
	});

	test('Call profileActions.setReadonly', async () => {
		jest.spyOn(profileActions, 'setReadonly').mockImplementation(mockSetReadonly);
		await componentRender(<EditableProfileCardHeader readonly />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
				profile: {
					data: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(mockDispatch).toHaveBeenCalled();
		expect(mockSetReadonly).toHaveBeenCalled();
	});
});
