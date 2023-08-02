import { Meta, StoryObj } from '@storybook/react';
import { NotificationItem } from './NotificationItem';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Notification } from '../../model/types/notification';

const notification: Notification = {
	id: '1',
	title: 'Уведомление 1',
	description: 'Произошло какое-то событие',
};

const meta = {
	title: 'entities/NotificationItem',
	component: NotificationItem,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		item: notification,
	},
} satisfies Meta<typeof NotificationItem>;

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
