import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@testing-library/user-event';
import { Overlay } from './Overlay';

const overlayContent = 'Overlay content';

describe('Overlay.test', () => {
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
		componentRender(<Overlay>{overlayContent}</Overlay>);

		expect(screen.getByText(overlayContent)).toBeInTheDocument();
	});

	test('Component has classes', async () => {
		componentRender(<Overlay centering>{overlayContent}</Overlay>);

		expect(screen.getByText(overlayContent)).toHaveClass('flex');
	});

	test('Clicked', async () => {
		const onClick = jest.fn();
		componentRender(<Overlay onClick={onClick}>{overlayContent}</Overlay>);

		await userEvent.click(screen.getByText(overlayContent));

		expect(onClick).toHaveBeenCalled();
	});
});
