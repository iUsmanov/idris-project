import { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { mockProfile } from '@/entities/Profile/testing';
const meta = {
	title: 'features/EditableProfileCard',
	component: EditableProfileCard,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		id: '1',
	},
	decorators: [
		StoreDecorator({
			profile: {
				formData: mockProfile,
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
				formData: mockProfile,
			},
		}),
	],
};

export const ValidateErrorsLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			profile: {
				formData: mockProfile,
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
