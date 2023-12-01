import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { UIDesignSwitcher } from './UIDesignSwitcher';
import { mockUser } from '@/entities/User/testing';
import { setFeatureFlags } from '@/shared/lib/featureFlags';

// const mockDispatch = jest.fn();
// jest.mock('react-redux', () => ({
// 	...jest.requireActual('react-redux'),
// 	useDispatch: () => mockDispatch,
// }));

jest.mock('@/entities/User/model/services/saveUserSettings/saveUserSettings');

describe('ThemeSwitcher.test', () => {
	test('Beauty Component', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		await componentRender(<UIDesignSwitcher />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('UIDesignSwitcher')).toBeInTheDocument();
		expect(screen.getByTestId('ListBox')).toBeInTheDocument();
		expect(screen.getByTestId('ListBox.Trigger')).toHaveTextContent('Красота');
		expect(screen.getByText('Выберите дизайн')).toBeInTheDocument();
	});

	test('Matrix Component', async () => {
		setFeatureFlags({ isBeautyDesign: false });
		await componentRender(<UIDesignSwitcher />, {
			wrapInAct: true,
			initialState: {
				user: {
					authData: mockUser,
				},
			},
		});

		expect(screen.getByTestId('UIDesignSwitcher')).toBeInTheDocument();
		expect(screen.getByTestId('ListBox')).toBeInTheDocument();
		expect(screen.getByTestId('ListBox.Trigger')).toHaveTextContent('Матрица');
		expect(screen.getByText('Выберите дизайн>')).toBeInTheDocument();
	});

	// test('select option', async () => {
	// 	await componentRender(<UIDesignSwitcher />, {
	// 		wrapInAct: true,
	// 	});

	// 	userEvent.selectOptions(screen.getByTestId('ListBox.ListBox'), 'someValue');

	// 	expect(mockDispatch).not.toHaveBeenCalled();
	// });
});
