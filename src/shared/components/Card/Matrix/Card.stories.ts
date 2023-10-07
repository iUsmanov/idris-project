import { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		children: 'Cool card',
	},
} satisfies Meta<typeof Card>;

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
