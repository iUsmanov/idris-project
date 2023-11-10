import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { DesktopView } from './DesktopView';

const elements = (
	<div>
		<div>Usual div</div>
		<DesktopView>
			<div>div in DesktopView</div>
		</DesktopView>
	</div>
);

describe('DesktopView.test', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('Component is rendered', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({}));

		componentRender(elements);
		expect(screen.getByText('Usual div')).toBeInTheDocument();
	});

	test('DesktopView in DOM', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: false,
		}));

		componentRender(elements);

		expect(screen.getByText('Usual div')).toBeInTheDocument();
		expect(screen.getByText('div in DesktopView')).toBeInTheDocument();
	});

	test('DesktopView is not in DOM', () => {
		window.matchMedia = jest.fn().mockImplementation((query) => ({
			matches: true,
		}));

		componentRender(elements);

		expect(screen.getByText('Usual div')).toBeInTheDocument();
		expect(screen.queryByText('div in DesktopView')).toBeNull();
	});
});

/* 

// Мокая весь window.matchMedia можно не писать так много кода,
// а писать лишь только те свойства, которые вы хотите замокать

Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});

// Коротко:
// Object.defineProperty(window, 'matchMedia', {
// 	value: jest.fn().mockImplementation(() => ({})),
// });

*/

/* 
ChatGPT предложил другой способ написать тесты:

import React from 'react';
import { render } from '@testing-library/react';
import { DesktopView } from './DesktopView';

jest.mock('@/shared/lib/hooks/useDevice/useDevice', () => ({
  useDevice: jest.fn(() => [false]) // Mocking isMobile to be false
}));

describe('DesktopView Component', () => {
  it('renders children when not in mobile view', () => {
    const { getByText } = render(<DesktopView>Test Content</DesktopView>);
    const contentElement = getByText('Test Content');
    expect(contentElement).toBeInTheDocument();
  });

  it('does not render children in mobile view', () => {
    jest.spyOn(require('@/shared/lib/hooks/useDevice/useDevice'), 'useDevice')
      .mockImplementation(() => [true]); // Mocking isMobile to be true

    const { container } = render(<DesktopView>Test Content</DesktopView>);
    expect(container.firstChild).toBeNull();
  });
});


*/
