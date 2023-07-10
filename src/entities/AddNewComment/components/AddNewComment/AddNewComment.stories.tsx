import { Meta, StoryObj } from '@storybook/react';
import { AddNewComment } from './AddNewComment';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const meta = {
	title: 'entities/AddNewComment',
	component: AddNewComment,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof AddNewComment>;

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

export const WithTextLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			addNewComment: {
				text: 'Your text',
			},
		}),
	],
};

export const LoadingLight: Story = {
	args: {
		isLoading: true,
	},
	decorators: [],
};

export const ErrorLight: Story = {
	args: { error: 'error' },
	decorators: [],
};
