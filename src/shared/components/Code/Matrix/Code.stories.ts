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
				text: 'Your Code'
			},
		} satisfies Meta<typeof Code>;
		
		export default meta;
		type Story = StoryObj<typeof meta>;
		
		export const PrimaryLight: Story = {
			args: {},
			decorators: [],
		};
		
		export const PrimaryDark: Story = {
			args: {},
			decorators: [ThemeDecorator('app-dark-theme')],
		};
		
		export const PrimaryOrange: Story = {
			args: {},
			decorators: [ThemeDecorator('app-orange-theme')],
		};
		`,
	},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLightMatrix: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
