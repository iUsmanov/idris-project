import { Comment } from '@/entities/Comment/testing';
import Image from '@/shared/assets/tests/storybook.jpg';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleCommentsByArticleId } from './fetchArticleCommentsByArticleId';
const comments: Comment[] = [
	{
		id: '1',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	{
		id: '2',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	{
		id: '3',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
];
describe('fetchArticleCommentsByArticleId.test', () => {
	test('Success load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		thunk.api.get.mockResolvedValue({ data: comments });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual(comments);
		expect(action.meta.requestStatus).toBe('fulfilled');
	});
	test('Error load', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		thunk.api.get.mockResolvedValue({ status: 403 });
		const action = await thunk.callThunk('1');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.get).toHaveBeenCalled();
		expect(action.payload).toEqual('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});
	test('With undefined articleId', async () => {
		const thunk = new TestAsyncThunk(fetchArticleCommentsByArticleId);
		const action = await thunk.callThunk('');

		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(action.payload).toEqual('error');
		expect(action.meta.requestStatus).toBe('rejected');
	});
});
