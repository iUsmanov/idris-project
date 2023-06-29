import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		value: 'Value',
		placeholder: 'Введите текст',
	},
} satisfies Meta<typeof Input>;

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

// !READONLY
export const ReadonlyLight: Story = {
	args: { readOnly: true },
	decorators: [],
};

export const ReadonlyDark: Story = {
	args: { readOnly: true },
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ReadonlyOrange: Story = {
	args: { readOnly: true },
	decorators: [ThemeDecorator('app-orange-theme')],
};
