import { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const items = [
	{
		content: 'CONTENTCONTENT',
	},
	{
		content: 'CONTENTCONTENT',
	},
	{
		content: 'CONTENTCONTENT',
	},
];

const meta = {
	title: 'shared/Dropdown',
	component: Dropdown,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		items: items,
		trigger: 'CLICK ME',
	},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLightBeauty: Story = {
	args: {},
	decorators: [],
};

export const PrimaryDarkBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const PrimaryOrangeBeauty: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};
