import { Meta, StoryObj } from '@storybook/react';
import { ArticleListItem } from './ArticleListItem';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockArticle } from '../../mocks';

const meta = {
	title: 'entities/ArticleListItem',
	component: ArticleListItem,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		article: mockArticle,
	},
} satisfies Meta<typeof ArticleListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {
		view: 'LIST',
	},
	decorators: [],
};

export const PrimaryDark: Story = {
	args: {
		view: 'TILE',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrange: Story = {
	args: {
		view: 'TILE',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
