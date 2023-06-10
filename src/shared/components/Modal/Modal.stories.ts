import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

const meta = {
	title: 'shared/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		isOpened: true,
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {
		children:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto laborum natus assumenda amet necessitatibus nesciunt perferendis, architecto excepturi reprehenderit. Ut rem pariatur possimus vero esse officia nostrum. Iusto perferendis, voluptatem explicabo non fugiat expedita praesentium aperiam? Tempora nulla magnam fuga cupiditate quae at quod, atque dolores maiores. Iure nihil reiciendis enim id distinctio quos consectetur dolore officia molestias dolorum at beatae voluptates eligendi ratione atque, esse necessitatibus non rerum minima eum architecto vel! Similique, consequatur modi. Perferendis expedita, animi voluptatum dolorum consequuntur quam. Facere quam, quia a hic, ea error architecto voluptas, rem cumque minus harum itaque alias veritatis.',
	},
	decorators: [],
};

export const Dark: Story = {
	args: {
		children:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto laborum natus assumenda amet necessitatibus nesciunt perferendis, architecto excepturi reprehenderit. Ut rem pariatur possimus vero esse officia nostrum. Iusto perferendis, voluptatem explicabo non fugiat expedita praesentium aperiam? Tempora nulla magnam fuga cupiditate quae at quod, atque dolores maiores. Iure nihil reiciendis enim id distinctio quos consectetur dolore officia molestias dolorum at beatae voluptates eligendi ratione atque, esse necessitatibus non rerum minima eum architecto vel! Similique, consequatur modi. Perferendis expedita, animi voluptatum dolorum consequuntur quam. Facere quam, quia a hic, ea error architecto voluptas, rem cumque minus harum itaque alias veritatis.',
	},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const Orange: Story = {
	args: {
		children:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto laborum natus assumenda amet necessitatibus nesciunt perferendis, architecto excepturi reprehenderit. Ut rem pariatur possimus vero esse officia nostrum. Iusto perferendis, voluptatem explicabo non fugiat expedita praesentium aperiam? Tempora nulla magnam fuga cupiditate quae at quod, atque dolores maiores. Iure nihil reiciendis enim id distinctio quos consectetur dolore officia molestias dolorum at beatae voluptates eligendi ratione atque, esse necessitatibus non rerum minima eum architecto vel! Similique, consequatur modi. Perferendis expedita, animi voluptatum dolorum consequuntur quam. Facere quam, quia a hic, ea error architecto voluptas, rem cumque minus harum itaque alias veritatis.',
	},
	decorators: [ThemeDecorator('app-orange-theme')],
};
