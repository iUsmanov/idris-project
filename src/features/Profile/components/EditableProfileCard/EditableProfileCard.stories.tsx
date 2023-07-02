import { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCard } from './EditableProfileCard';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/EditableProfileCard',
	component: EditableProfileCard,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
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
