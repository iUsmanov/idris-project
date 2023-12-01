import { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { mockProfile } from '../../mocks';

const meta = {
	title: 'entities/ProfileCard',
	component: ProfileCard,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		data: mockProfile,
	},
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
	args: {},
	decorators: [],
};

export const PrimaryBeautyLight: Story = {
	args: {},
	decorators: [FeatureFlagsDecorator({ isBeautyDesign: true })],
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
