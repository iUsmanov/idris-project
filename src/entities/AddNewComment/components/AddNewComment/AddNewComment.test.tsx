import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AddNewComment } from './AddNewComment';
import { act } from 'react-dom/test-utils';
import { userEvent } from '@testing-library/user-event';
import { addNewCommentReducer, addNewCommentActions } from '../../model/slice/addNewCommentSlice';

const sendNewComment = jest.fn();
const mockDispatch = jest.fn();
// const mockSetText = jest.fn(); not working

jest.mock('../../model/slice/addNewCommentSlice', () => {
	return {
		...jest.requireActual('../../model/slice/addNewCommentSlice'),
		addNewCommentActions: {
			...jest.requireActual('../../model/slice/addNewCommentSlice').addNewCommentActions,
			setText: jest.fn(),
		},
	};
});

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockDispatch,
}));

describe('AddNewComment.test', () => {
	test('Component is rendered, but without title and text', async () => {
		await act(async () => componentRender(<AddNewComment sendNewComment={sendNewComment} />));

		expect(screen.getByTestId('AddNewComment')).toBeInTheDocument();
		expect(screen.getByTestId('Input')).toBeInTheDocument();
		expect(screen.getByTestId('Button')).toBeInTheDocument();
	});

	test('Click on Button', async () => {
		await act(async () =>
			componentRender(<AddNewComment sendNewComment={sendNewComment} />, {
				initialState: {
					addNewComment: {
						text: 'commentText',
					},
				},
				asyncReducers: {
					addNewComment: addNewCommentReducer,
				},
			})
		);

		await userEvent.click(screen.getByTestId('Button'));

		expect(sendNewComment).toHaveBeenCalledWith('commentText');
	});

	test('Prop isLoading is true', async () => {
		await act(async () =>
			componentRender(<AddNewComment sendNewComment={sendNewComment} isLoading />)
		);

		expect(screen.getByTestId('Input')).toBeDisabled();
		expect(screen.getByTestId('Button')).toBeDisabled();
	});

	test('Error', async () => {
		await act(async () =>
			componentRender(<AddNewComment sendNewComment={sendNewComment} error='error' />)
		);

		expect(screen.getByTestId('AddNewComment')).toBeInTheDocument();
		expect(screen.getByTestId('Input')).toBeInTheDocument();
		expect(screen.getByTestId('Button')).toBeInTheDocument();
		expect(screen.getByTestId('Text')).toBeInTheDocument();
		expect(screen.getByText('Произошла непредвиденная ошибка')).toBeInTheDocument();
	});

	test('Typing', async () => {
		await act(async () =>
			componentRender(<AddNewComment sendNewComment={sendNewComment} />, {
				asyncReducers: {
					addNewComment: addNewCommentReducer,
				},
			})
		);

		const input = screen.getByTestId('Input');
		expect(input).toBeInTheDocument();

		await userEvent.type(input, 'Hello');

		expect(mockDispatch).toHaveBeenCalledTimes(5);
		expect(addNewCommentActions.setText).toHaveBeenCalledTimes(5);
		expect(addNewCommentActions.setText).toHaveBeenCalledWith('H');
		expect(addNewCommentActions.setText).toHaveBeenCalledWith('e');
		expect(addNewCommentActions.setText).toHaveBeenCalledWith('l');
		expect(addNewCommentActions.setText).toHaveBeenCalledWith('l');
		expect(addNewCommentActions.setText).toHaveBeenCalledWith('o');
	});
});
