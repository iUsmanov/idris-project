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

export const Primary: Story = {
	args: {},
	decorators: [],
};
