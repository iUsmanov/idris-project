import { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Image from '@/shared/assets/tests/storybook.jpg';
import { Currency } from '@/entities/Currency/testing';
import { Country } from '@/entities/Country/testing';

const meta = {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		data: {
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
} satisfies Meta<typeof ProfileCard>;

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
	args: {
		isLoading: true,
	},
	decorators: [],
};

export const ErrorLight: Story = {
	args: {
		error: 'error',
	},
	decorators: [],
};

export const ReadonlyLight: Story = {
	args: {
		readonly: true,
	},
	decorators: [],
};
