import { Meta, StoryObj } from '@storybook/react';
import { ArticleRecommendations } from './ArticleRecommendations';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockStorybookGetArticleRecommendationsSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'shared/ArticleRecommendations',
	component: ArticleRecommendations,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		mockData: [mockStorybookGetArticleRecommendationsSuccess],
	},
} satisfies Meta<typeof ArticleRecommendations>;

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
