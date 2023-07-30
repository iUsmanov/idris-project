import 'whatwg-fetch';
import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import userEvent from '@testing-library/user-event';
import { EditableProfileCard } from './EditableProfileCard';
import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import { Profile } from '@/entities/Profile/testing';
import { profileReducer } from '../../model/slice/profileSlice';
import { $api } from '@/shared/api/api';
import axios from 'axios';

// =====PAL
/* 

jest.mock('axios', () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(),
			interceptors: {
				request: { use: jest.fn(), eject: jest.fn() },
				response: { use: jest.fn(), eject: jest.fn() },
			},
		})),
	};
});

// const mockedAxios = jest.mocked(axios);
// mockedAxios.get = jest.fn();

const mockedApi = jest.mocked($api);
// mockedApi.get = jest.fn();
// mockedApi.interceptors = {
// 	request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
// 	response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
// };

// jest.spyOn($api, 'get').mockResolvedValue({ data: profile });
 */
// ======================PAL
const profile: Profile = {
	id: '1',
	age: 30,
	avatar: 'https://',
	city: 'Moscow',
	currency: Currency.RUB,
	country: Country.ARMENIA,
	first: 'Jackson',
	lastname: 'Volk',
	username: 'Chotkiy pocik',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			formData: profile,
		},
		user: {
			authData: {
				id: '1',
			},
		},
	},
	asyncReducers: {
		profile: profileReducer,
	},
};

describe('features/EditableProfileCard/EditableProfileCard', () => {
	test('Режим ридонли должен выключиться', async () => {
		// const getRequest = jest.spyOn($api, 'get');
		componentRender(<EditableProfileCard id='1' />, options);

		// expect(getRequest).toHaveBeenCalled();
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
	});

	test('При нажатии на кнопку "Отменить" изменения должны обнуляться', async () => {
		componentRender(<EditableProfileCard id='1' />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.clear(screen.getByTestId('ProfileCard.InputFirstName'));
		await userEvent.clear(screen.getByTestId('ProfileCard.InputLastName'));

		await userEvent.type(screen.getByTestId('ProfileCard.InputFirstName'), 'Ivan');
		await userEvent.type(screen.getByTestId('ProfileCard.InputLastName'), 'Sidorov');

		expect(screen.getByTestId('ProfileCard.InputFirstName')).toHaveValue('Ivan');
		expect(screen.getByTestId('ProfileCard.InputLastName')).toHaveValue('Sidorov');

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
		expect(screen.getByTestId('ProfileCard.InputFirstName')).toHaveValue('Jackson');
		expect(screen.getByTestId('ProfileCard.InputLastName')).toHaveValue('Volk');
	});
	test('Должна появиться валидационная ошибка', async () => {
		componentRender(<EditableProfileCard id='1' />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.clear(screen.getByTestId('ProfileCard.InputFirstName'));
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(screen.getByTestId('EditableProfileCardHeader.ErrorText.Text')).toBeInTheDocument();
	});
	test('Если нет валидационной ошибки, то на сервер должен уйти PUT-запрос', async () => {
		const putRequest = jest.spyOn($api, 'put');
		componentRender(<EditableProfileCard id='1' />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		await userEvent.type(screen.getByTestId('ProfileCard.InputFirstName'), 'Ivan');
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(putRequest).toHaveBeenCalled();
	});
});
