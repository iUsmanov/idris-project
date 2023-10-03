import { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Image from '@/shared/assets/tests/storybook.jpg';

const meta = {
	title: 'entities/CommentCard',
	component: CommentCard,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		comment: {
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
	},
} satisfies Meta<typeof CommentCard>;

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
