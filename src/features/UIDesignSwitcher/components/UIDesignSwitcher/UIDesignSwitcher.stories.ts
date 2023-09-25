import { Meta, StoryObj } from '@storybook/react';
import { UIDesignSwitcher } from './UIDesignSwitcher';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/UIDesignSwitcher',
	component: UIDesignSwitcher,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
} satisfies Meta<typeof UIDesignSwitcher>;

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
