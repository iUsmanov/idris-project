import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const tabs = [
	{
		content: 'Tab 1',
		value: 'Tab 1',
	},
	{
		content: 'Tab 2',
		value: 'Tab 2',
	},
	{
		content: 'Tab 3',
		value: 'Tab 3',
	},
];
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
		tabs: tabs,
		value: 'Tab 2',
	},
} satisfies Meta<typeof Tabs>;

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
