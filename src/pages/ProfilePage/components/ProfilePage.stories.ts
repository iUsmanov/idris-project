import { Meta, StoryObj } from '@storybook/react';
import { ProfilePage } from './ProfilePage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';
import Image from '@/shared/assets/tests/storybook.jpg';

const meta = {
	title: 'pages/ProfilePage',
	component: ProfilePage,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				formData: {
					age: 30,
					avatar: Image,
					city: 'Moscow',
					currency: Currency.RUB,
					country: Country.ARMENIA,
					first: 'Jackson',
					lastname: 'Styled',
					username: 'Chotkiy pocik',
				},
				readonly: true,
				data: {
					id: '1',
				},
			},
			user: {
				authData: {
					id: '1',
				},
			},
		}),
	],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadonlyLight: Story = {
	args: {},
	decorators: [],
};

export const ReadonlyDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ReadonlyOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const LoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				isLoading: true,
			},
		}),
	],
};

export const ErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				error: 'error',
			},
		}),
	],
};

export const EditingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				readonly: false,
				formData: {
					age: 30,
					avatar: Image,
					city: 'Moscow',
					currency: Currency.RUB,
					country: Country.ARMENIA,
					first: 'Jackson',
					lastname: 'Styled',
					username: 'Chotkiy pocik',
				},
				data: {
					id: '1',
				},
			},
			user: {
				authData: {
					id: '1',
				},
			},
		}),
	],
};

export const ValidateErrorsLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				formData: {
					age: 30,
					avatar: Image,
					city: '',
					currency: Currency.RUB,
					country: Country.ARMENIA,
					first: '',
					lastname: 'Styled',
					username: 'Chotkiy pocik',
				},
				validateErrors: ['incorrectFirstName', 'incorrectCity'],
				data: {
					id: '1',
				},
			},
			user: {
				authData: {
					id: '1',
				},
			},
		}),
	],
};
