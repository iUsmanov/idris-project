import type { Meta, StoryObj } from '@storybook/react';
import { ForbiddenPage } from './ForbiddenPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'pages/ForbiddenPage',
	component: ForbiddenPage,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof ForbiddenPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {},
	decorators: [],
};

export const Dark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const Orange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
