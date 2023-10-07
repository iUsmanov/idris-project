import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		children: 'Button',
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const NormalDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const NormalOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
