import { Meta, StoryObj } from '@storybook/react';
import { NotificationsList } from './NotificationsList';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockStorybookGetNotificationsSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'entities/NotificationsList',
	component: NotificationsList,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		mockData: [mockStorybookGetNotificationsSuccess],
	},
} satisfies Meta<typeof NotificationsList>;

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
