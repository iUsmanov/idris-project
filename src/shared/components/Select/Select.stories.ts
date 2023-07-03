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
			{ value: 'value1', content: 'content1' },
			{ value: 'value2', content: 'content2' },
			{ value: 'value3', content: 'content3' },
			{ value: 'value4', content: 'content4' },
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

export const DisabledLight: Story = {
	args: {
		disabled: true,
	},
};

export const NoLabelLight: Story = {
	args: {
		label: '',
	},
};
