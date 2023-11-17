import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Modal } from './Modal';
import { act } from 'react-dom/test-utils';
import { userEvent } from '@testing-library/user-event';

const wrapper = <div className='wrapper'></div>;
const modalContent = 'Modal content';

describe('Modal.test', () => {
	const keyCodes: Record<string, number> = {
		Escape: 27,
	};
	function patchKeyEvent(e: KeyboardEvent) {
		Object.defineProperty(e, 'keyCode', {
			get: () => keyCodes[e.code] ?? 0,
		});
	}
	beforeAll(() => {
		document.addEventListener('keydown', patchKeyEvent, { capture: true });
	});

	test('Component is rendered', async () => {
		await act(async () => {
			componentRender(<Modal>{modalContent}</Modal>);
		});
		expect(screen.getByText(modalContent)).toBeInTheDocument();
		expect(screen.getByTestId('Modal')).toBeInTheDocument();
	});

	test('Component has classes', async () => {
		await act(async () => {
			componentRender(<Modal isOpened>{modalContent}</Modal>);
		});

		const ModalComponent = screen.getByTestId('Modal');
		const ModalContentDiv = screen.getByText(modalContent);

		expect(ModalComponent).toBeInTheDocument();
		expect(ModalComponent).toHaveClass('opened');
		expect(ModalContentDiv).toBeInTheDocument();
		expect(ModalContentDiv).toHaveClass('modalContent');
	});

	test('If container is defined, Modal is not is DOM', async () => {
		await act(async () => {
			componentRender(<Modal container={wrapper as any}>{modalContent}</Modal>);
		});
		expect(screen.queryByTestId('Modal')).toBeNull();
	});

	test('Close modal by mouse click', async () => {
		const onModalClose = jest.fn();
		componentRender(<Modal onModalClose={onModalClose}>{modalContent}</Modal>);

		const overlay = screen.getByTestId('Modal.Overlay');

		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(overlay).toBeInTheDocument();

		await userEvent.click(overlay);

		expect(onModalClose).toHaveBeenCalled();
	});

	test('Close modal by Escape', async () => {
		const onModalClose = jest.fn();
		componentRender(
			<Modal onModalClose={onModalClose} isOpened>
				{modalContent}
			</Modal>
		);

		const overlay = screen.getByTestId('Modal.Overlay');

		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(overlay).toBeInTheDocument();

		await userEvent.keyboard('{Escape}');

		expect(onModalClose).toHaveBeenCalled();
	});
});
