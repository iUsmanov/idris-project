import { Meta, StoryObj } from '@storybook/react';
import { ScrollToTopButton } from './ScrollToTopButton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/ScrollToTopButton',
	component: ScrollToTopButton,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof ScrollToTopButton>;

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
