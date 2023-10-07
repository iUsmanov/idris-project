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

// !READONLY
export const ReadonlyLightMatrix: Story = {
	args: { readOnly: true },
	decorators: [],
};

export const ReadonlyDarkMatrix: Story = {
	args: { readOnly: true },
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ReadonlyOrangeMatrix: Story = {
	args: { readOnly: true },
	decorators: [ThemeDecorator('app-orange-theme')],
};
