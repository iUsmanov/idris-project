import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Select',
	component: Select,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		label: 'Укажите значение',
		options: [
			{ value: 'lala1', content: 'nelala1' },
			{ value: 'lala2', content: 'nelala2' },
			{ value: 'lala3', content: 'nelala3' },
			{ value: 'lala4', content: 'nelala4' },
		],
	},
} satisfies Meta<typeof Select>;

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
