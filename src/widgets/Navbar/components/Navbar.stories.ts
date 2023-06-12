import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const meta = {
	title: 'widgets/Navbar',
	component: Navbar,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// LOGOUT
export const LogoutedLight: Story = {
	args: {},
	decorators: [],
};

export const LogoutedDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const LogoutedOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

// LOGIN
export const LoginedLight: Story = {
	args: {},
	decorators: [StoreDecorator({ user: { authData: {} } })],
};

export const LoginedDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme'), StoreDecorator({ user: { authData: {} } })],
};

export const LoginedOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme'), StoreDecorator({ user: { authData: {} } })],
};
