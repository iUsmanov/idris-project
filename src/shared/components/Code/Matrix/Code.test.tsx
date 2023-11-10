import { screen } from '@testing-library/react';
import { Code } from './Code';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const codeText = 'Code';

describe('Code.test', () => {
	// Object.defineProperty(navigator, "clipboard", {
	// 	value: {
	// 	  writeText: async () => {},
	// 	},
	//  });

	// Object.assign(navigator, {
	// 	clipboard: {
	// 	  writeText,
	// 	},
	//  });

	test('Component is rendered', async () => {
		await act(async () => componentRender(<Code text={codeText} />));
		expect(screen.getByTestId('Code')).toBeInTheDocument();
		expect(screen.getByTestId('Button')).toBeInTheDocument();
	});

	test('Text of code in DOM', async () => {
		await act(async () => componentRender(<Code text={codeText} />));
		expect(screen.getByText(codeText)).toBeInTheDocument();
	});

	test('Code is copied successfully', async () => {
		userEvent.setup();
		await act(async () => componentRender(<Code text={codeText} />));

		const Button = screen.getByTestId('Button');
		await userEvent.click(Button);
		const actualText = await navigator.clipboard.readText();

		// EXPECTS
		expect(actualText).toBe(codeText);
	});
});
