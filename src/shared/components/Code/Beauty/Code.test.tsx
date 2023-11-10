import { screen } from '@testing-library/react';
import { Code } from './Code';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { act } from 'react-dom/test-utils';
import { setFeatureFlags } from '@/shared/lib/featureFlags';
import userEvent from '@testing-library/user-event';

const codeText = 'Code';

describe('Code.test', () => {
	test('Component is rendered', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		await act(async () => componentRender(<Code text={codeText} />));

		const Button = screen.getByRole('button');

		expect(Button).toBeInTheDocument();
		expect(screen.getByTestId('Code')).toBeInTheDocument();
		// expect(screen.getByTestId('Button')).toBeInTheDocument();
	});

	test('Text of code in DOM', async () => {
		await act(async () => componentRender(<Code text={codeText} />));
		expect(screen.getByText(codeText)).toBeInTheDocument();
	});

	test('Code is copied successfully', async () => {
		setFeatureFlags({ isBeautyDesign: true });
		userEvent.setup();
		await act(async () => componentRender(<Code text={codeText} />));

		const Button = screen.getByRole('button');
		await userEvent.click(Button);
		const actualText = await navigator.clipboard.readText();

		// EXPECTS
		expect(actualText).toBe(codeText);
	});
});
