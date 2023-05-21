import { Meta, StoryObj } from '@storybook/react';
import { [FTName] } from './[FTName]';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/[FTName]',
	component: [FTName],
	tags: ['autodocs'],
	argTypes: {},
	args: {
		
	},
} satisfies Meta<typeof [FTName]>;

export default meta;
type Story = StoryObj<typeof meta>;



export const Primary: Story = {
	args: {
		
	},
	decorators: [],
};