import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { mockTabs } from '../testing';

const meta = {
	title: 'shared/Tabs',
	component: Tabs,
	tags: ['autodocs'],
	argTypes: {
		onTabClick: {
			action: 'onTabClick',
		},
	},
	args: {
		tabs: mockTabs,
		value: 'Tab 2',
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLightMatrix: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeMatrix: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
