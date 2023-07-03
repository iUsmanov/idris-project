import { Meta, StoryObj } from '@storybook/react';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'features/EditableProfileCardHeader',
	component: EditableProfileCardHeader,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		readonly: true,
	},
	decorators: [],
} satisfies Meta<typeof EditableProfileCardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReadonlyLight: Story = {
	args: {},
	decorators: [],
};

export const ReadonlyDark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const ReadonlyOrange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const EditingLight: Story = {
	args: {
		readonly: false,
	},
	decorators: [],
};

export const ValidateErrorsLight: Story = {
	args: {
		profileValidateErrors: ['incorrectFirstName', 'incorrectAge'],
	},
	decorators: [],
};
