import { Meta, StoryObj } from '@storybook/react';
import { ArticleCommentsList } from './ArticleCommentsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/ArticleCommentsList',
	component: ArticleCommentsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		router: {
			path: '/articles/:id',
			route: '/articles/1',
		},
	},
} satisfies Meta<typeof ArticleCommentsList>;

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
