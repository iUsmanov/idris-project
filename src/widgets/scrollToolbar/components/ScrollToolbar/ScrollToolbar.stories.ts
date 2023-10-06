import { Meta, StoryObj } from '@storybook/react';
import { ScrollToolbar } from './ScrollToolbar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'widgets/ScrollToolbar',
	component: ScrollToolbar,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof ScrollToolbar>;

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
