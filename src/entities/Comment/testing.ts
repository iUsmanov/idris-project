import type { Comment } from './model/types/comment';
import Image from '@/shared/assets/tests/storybook.jpg';

const pathToAvatar = '../../shared/assets/tests/storybook.jpg';

export type { Comment };
export const mockComment: Comment = {
	id: '1',
	text: 'some comment',
	articleId: '1',
	userId: '1',
	user: {
		id: '1',
		username: 'admin',
		avatar: Image,
	},
};

export const mockComments: Comment[] = [
	{
		id: '1',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			id: '1',
			username: 'admin',
			avatar: Image,
		},
	},
	{
		id: '2',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			id: '1',
			username: 'admin',
			avatar: Image,
		},
	},
	{
		id: '3',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			id: '1',
			username: 'admin',
			avatar: Image,
		},
	},
];
