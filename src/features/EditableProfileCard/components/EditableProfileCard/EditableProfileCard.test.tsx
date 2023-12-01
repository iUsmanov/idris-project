import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { mockProfile } from '@/entities/Profile/testing';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

jest.mock('../../model/services/fetchProfileData/fetchProfileData');

describe('EditableProfileCard.test', () => {
	test('Component is rendered', async () => {
		await componentRender(<EditableProfileCard id='1' />, {
			wrapInAct: true,
			initialState: {
				profile: {
					readonly: true,
					data: mockProfile,
					formData: mockProfile,
				},
			},
			asyncReducers: {
				profile: profileReducer,
			},
		});

		expect(screen.getByTestId('EditableProfileCard')).toBeInTheDocument();
		expect(screen.getByTestId('EditableProfileCardHeader')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard')).toBeInTheDocument();

		// TODO Если в useInitialEffect нет заглушки для джеста
		// expect(mockDispatch).toHaveBeenCalled();
		// expect(fetchProfileData).toHaveBeenCalledWith('1');
	});
});
