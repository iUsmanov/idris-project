import { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import Image from '@/shared/assets/tests/storybook.jpg';
const meta = {
	title: 'features/EditableProfileCard',
	component: EditableProfileCard,
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
			},
		}),
	],
	parameters: {
		router: {
			path: '/profiles/:id',
			route: '/profiles/1',
		},
	},
} satisfies Meta<typeof EditableProfileCard>;

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

export const ReadonlyLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				readonly: true,
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
			},
		}),
	],
};
