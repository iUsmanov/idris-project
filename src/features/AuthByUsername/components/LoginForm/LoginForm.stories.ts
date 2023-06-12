import { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

const meta = {
	title: 'features/LoginForm',
	component: LoginForm,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [StoreDecorator({ loginForm: { username: 'admin', password: '123' } })],
} satisfies Meta<typeof LoginForm>;

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
// WITH ERROR
export const ErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			loginForm: {
				username: 'admin',
				password: '1234',
				error: 'Вы ввели неверный логин или пароль',
			},
		}),
	],
};

export const ErrorDark: Story = {
	args: {},
	decorators: [
		ThemeDecorator('app-dark-theme'),
		StoreDecorator({
			loginForm: {
				username: 'admin',
				password: '1234',
				error: 'Вы ввели неверный логин или пароль',
			},
		}),
	],
};

export const ErrorOrange: Story = {
	args: {},
	decorators: [
		ThemeDecorator('app-orange-theme'),
		StoreDecorator({
			loginForm: {
				username: 'admin',
				password: '1234',
				error: 'Вы ввели неверный логин или пароль',
			},
		}),
	],
};

// LOADING

export const LoadingLight: Story = {
	args: {},
	decorators: [StoreDecorator({ loginForm: { username: 'admin', password: '123', isLoading: true } })],
};
