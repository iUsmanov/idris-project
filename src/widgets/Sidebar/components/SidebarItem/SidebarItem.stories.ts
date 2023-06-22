import type { Meta, StoryObj } from '@storybook/react';
import { SidebarItem } from './SidebarItem';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { getRouteMain } from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';

const meta = {
	title: 'widgets/SidebarItem',
	component: SidebarItem,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		collapsed: false,
		item: {
			path: getRouteMain(),
			text: 'Главная',
			Icon: MainIcon,
		},
	},
} satisfies Meta<typeof SidebarItem>;

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

export const CollapsedLight: Story = {
	args: {
		collapsed: true,
	},
	decorators: [],
};

export const CollapsedDark: Story = {
	args: {
		collapsed: true,
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const CollapsedOrange: Story = {
	args: {
		collapsed: true,
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
