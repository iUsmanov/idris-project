import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { screen } from '@testing-library/react';
import { RatingCard } from './RatingCard';
import { userEvent } from '@testing-library/user-event';

jest.mock('@/shared/lib/hooks/useModal/useModal', () => ({
	useModal: jest.fn(() => ({
		isOpened: true,
		isMounted: true,
		onMountAndOpen: jest.fn(),
		onUnmountAndClose: jest.fn(),
	})),
}));

describe('RatingCard.test', () => {
	// Попробавть убрать это, а также поставить в начале тест-кейс бьюти
	afterEach(() => {
		jest.clearAllMocks();
	});
	test('Desktop-Component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('StarsCount')).toBeInTheDocument();
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByText('Ваш отзыв>')).toBeInTheDocument();
		expect(screen.getByText('Закрыть')).toBeInTheDocument();
		expect(screen.getByText('Отправить')).toBeInTheDocument();
		expect(screen.getByTestId('FeedbackInput')).toBeInTheDocument();
		expect(screen.getByTestId('RatingCard')).toBeInTheDocument();
		expect(screen.getByTestId('StarRating')).toBeInTheDocument();
	});

	test('Mobile Component is rendered', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
		}));
		await componentRender(<RatingCard />, {
			wrapInAct: true,
		});

		// screen.debug();
		expect(screen.getByTestId('StarsCount')).toBeInTheDocument();
		expect(screen.getByTestId('Drawer')).toBeInTheDocument();
		expect(screen.getByText('Ваш отзыв>')).toBeInTheDocument();
		expect(screen.getByText('Отправить')).toBeInTheDocument();
		expect(screen.getByTestId('FeedbackInput')).toBeInTheDocument();
		expect(screen.getByTestId('RatingCard')).toBeInTheDocument();
		expect(screen.getByTestId('StarRating')).toBeInTheDocument();
	});

	test('Component with passed feedbackTitle', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard feedbackTitle='feedbackTitle' />, {
			wrapInAct: true,
		});

		expect(screen.getByText('feedbackTitle')).toBeInTheDocument();
	});

	test('Component with passed rate', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard rate={1} title='title' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('StarsCount')).toHaveTextContent('Спасибо за оценку!');
	});

	test('Component with passed title', async () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard title='title' />, {
			wrapInAct: true,
		});

		expect(screen.getByTestId('StarsCount')).toHaveTextContent('title');
	});

	test('Component with passed acceptHandler', async () => {
		const onAccept = jest.fn();
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard onAccept={onAccept} rate={1} />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByText('Отправить'));

		expect(onAccept).toHaveBeenCalledWith(1, '');
	});

	test('Desktop-Component with passed onCancel', async () => {
		const onCancel = jest.fn();
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));
		await componentRender(<RatingCard onCancel={onCancel} rate={1} />, {
			wrapInAct: true,
		});

		await userEvent.click(screen.getByText('Закрыть'));

		expect(onCancel).toHaveBeenCalledWith(1);
	});
});
