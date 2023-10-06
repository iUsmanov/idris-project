import { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Code',
	component: Code,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		text: `import { Meta, StoryObj } from '@storybook/react';
		import { Code } from './Code';
		import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
		
		const meta = {
			title: 'shared/Code',
			component: Code,
			tags: ['autodocs'],
			argTypes: {},
			args: {
				text: ``
			},
		} satisfies Meta<typeof Code>;
		
		export default meta;
		type Story = StoryObj<typeof meta>;
		
		export const NormalLight: Story = {
			args: {},
			decorators: [],
		};
		
		export const NormalDark: Story = {
			args: {},
			decorators: [ThemeDecorator('app-dark-theme')],
		};
		
		export const NormalOrange: Story = {
			args: {},
			decorators: [ThemeDecorator('app-orange-theme')],
		};
		`,
	},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLight: Story = {
	args: {},
	decorators: [],
};

export const NormalDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const NormalOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
