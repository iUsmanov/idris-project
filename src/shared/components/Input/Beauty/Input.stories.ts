import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NormalLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const NormalDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const NormalOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
