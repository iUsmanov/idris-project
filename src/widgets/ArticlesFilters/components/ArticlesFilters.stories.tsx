import { Meta, StoryObj } from '@storybook/react';
import { ArticlesFilters } from './ArticlesFilters';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/ArticlesFilters',
	component: ArticlesFilters,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		order: 'asc',
		search: 'value',
		sort: 'createdAt',
	},
} satisfies Meta<typeof ArticlesFilters>;

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
