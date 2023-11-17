import { screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Flex } from './Flex';

const flexContent = 'flexContent';

describe('Select.test', () => {
	test('Component is rendered', async () => {
		componentRender(<Flex>{flexContent}</Flex>);

		expect(screen.getByText(flexContent)).toBeInTheDocument();
	});
});
