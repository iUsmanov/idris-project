import { Meta, StoryObj } from '@storybook/react';
import { NotificationsPopup } from './NotificationsPopup';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockStorybookGetNotificationsSuccess } from '@/shared/mocks/storybook/requests';

const meta = {
	title: 'features/NotificationsPopup',
	component: NotificationsPopup,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	parameters: {
		mockData: [mockStorybookGetNotificationsSuccess],
	},
} satisfies Meta<typeof NotificationsPopup>;

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
