import { Meta, StoryObj } from '@storybook/react';
import { MainLayout } from './MainLayout';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/MainLayout',
	component: MainLayout,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		header: <div>header</div>,
		sidebar: <div>sidebar</div>,
		content: <div>content</div>,
	},
} satisfies Meta<typeof MainLayout>;

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
