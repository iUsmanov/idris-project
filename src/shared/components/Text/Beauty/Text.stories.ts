import { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Text',
	component: Text,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Text>;

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
