import { Meta, StoryObj } from '@storybook/react';
import { CommentsList } from './CommentsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Image from '@/shared/assets/tests/storybook.jpg';

const meta = {
	title: 'entities/CommentsList',
	component: CommentsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {
		comments: [
			{
				id: '1',
				text: 'some comment',
				articleId: '1',
				userId: '1',
				user: {
					id: '1',
					username: 'admin',
					avatar: Image,
				},
			},
			{
				id: '2',
				text: 'some comment',
				articleId: '1',
				userId: '1',
				user: {
					id: '1',
					username: 'admin',
					avatar: Image,
				},
			},
		],
	},
	decorators: [],
};

export const LoadingDark: Story = {
	args: {
		isLoading: true,
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ErrorOrange: Story = {
	args: {
		error: 'error',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
