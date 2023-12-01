import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';
import { mockProfile } from '../../mocks';

describe('ProfileCard.test', () => {
	test('Loading', async () => {
		await componentRender(<ProfileCard isLoading />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ProfileCard.IsLoading')).toBeInTheDocument();
		expect(screen.getByTestId('Loader')).toBeInTheDocument();
	});

	test('Error', async () => {
		await componentRender(<ProfileCard error='error' />, {
			wrapInAct: true,
		});

		expect(screen.getByText('Произошла ошибка при загрузке')).toBeInTheDocument();
		expect(screen.getByText('Попробуйте обновить страницу')).toBeInTheDocument();
	});

	test('Component is rendered', async () => {
		await componentRender(<ProfileCard />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ProfileCard')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.Avatar')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputFirstName')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputLastName')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputAge')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputCity')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputUsername')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputAvatar')).toBeInTheDocument();
		expect(screen.getByTestId('CurrencySelect')).toBeInTheDocument();
		expect(screen.getByTestId('CountrySelect')).toBeInTheDocument();
	});

	test('With passed data', async () => {
		await componentRender(<ProfileCard data={mockProfile} />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('ProfileCard')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.Avatar')).toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.InputFirstName')).toHaveValue(mockProfile.first);
		expect(screen.getByTestId('ProfileCard.InputLastName')).toHaveValue(mockProfile.lastname);
		expect(screen.getByTestId('ProfileCard.InputAge')).toHaveValue(String(mockProfile.age));
		expect(screen.getByTestId('ProfileCard.InputCity')).toHaveValue(mockProfile.city);
		expect(screen.getByTestId('ProfileCard.InputUsername')).toHaveValue(mockProfile.username);
		expect(screen.getByTestId('ProfileCard.InputAvatar')).toHaveValue(mockProfile.avatar);
		expect(screen.getByTestId('CurrencySelect')).toBeInTheDocument();
		expect(screen.getByTestId('CountrySelect')).toBeInTheDocument();
	});
});
