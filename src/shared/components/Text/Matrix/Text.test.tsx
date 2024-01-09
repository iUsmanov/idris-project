import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Text } from './Text';

const title = 'title';
const text = 'text';

describe('Tabs.test', () => {
	test('Component is rendered, but without title and text', () => {
		componentRender(<Text />);

		expect(screen.getByTestId('Text')).toBeInTheDocument();
		expect(screen.queryByTestId('Text.Title')).toBeNull();
		expect(screen.queryByTestId('Text.Text')).toBeNull();
	});

	test('Component is rendered with title and text', () => {
		componentRender(<Text title={title} text={text} />);

		expect(screen.getByTestId('Text')).toBeInTheDocument();
		expect(screen.getByTestId('Text.Title')).toBeInTheDocument();
		expect(screen.getByTestId('Text.Text')).toBeInTheDocument();
	});

	test('Title and text has their values', () => {
		componentRender(<Text title={title} text={text} />);

		expect(screen.getByTestId('Text.Title')).toHaveTextContent(title);
		expect(screen.getByTestId('Text.Text')).toHaveTextContent(text);
	});

	test('Title and text has tag `p` by default', () => {
		const { container }: any = componentRender(<Text title={title} text={text} />);

		const paragraphs = container.querySelectorAll('p');
		const titleComponent = screen.getByTestId('Text.Title');
		const textComponent = screen.getByTestId('Text.Text');

		// EXPECTS
		expect(titleComponent).toBe(paragraphs[0]);
		expect(textComponent).toBe(paragraphs[1]);
	});

	test('Title has tag `h1`', () => {
		const { container }: any = componentRender(<Text title={title} text={text} tags={['h1']} />);

		// EXPECTS
		expect(screen.getByTestId('Text.Title')).toBe(container.querySelector('h1'));
		expect(screen.getByTestId('Text.Text')).toBe(container.querySelector('p'));
	});

	test('Title has tag `h1, text has tag `a', () => {
		const { container }: any = componentRender(<Text title={title} text={text} tags={['h1', 'a']} />);

		// EXPECTS
		expect(screen.getByTestId('Text.Title')).toBe(container.querySelector('h1'));
		expect(screen.getByTestId('Text.Text')).toBe(container.querySelector('a'));
	});
});
