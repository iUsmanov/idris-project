import { Meta, StoryObj } from '@storybook/react';
import { ArticleRating } from './ArticleRating';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockStorybookGetArticleRatingSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'features/ArticleRating',
	component: ArticleRating,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		articleId: '1',
	},
	parameters: {
		mockData: [mockStorybookGetArticleRatingSuccess],
	},
} satisfies Meta<typeof ArticleRating>;

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
