import { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const people = [
	{ content: 'Durward Reyno', value: 'Durward Reynolds', disabled: false },
	{ content: 'Kenton Towne', value: 'Kenton Towne', disabled: false },
	{ content: 'Therese Wunsc', value: 'Therese Wunsch', disabled: false },
	{ content: 'Benedict Kess', value: 'Benedict Kessler', disabled: true },
	{ content: 'Katelyn Rohan', value: 'Katelyn Rohan', disabled: false },
];

const meta = {
	title: 'shared/ListBox',
	component: ListBox,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		options: people,
	},
} satisfies Meta<typeof ListBox>;

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
