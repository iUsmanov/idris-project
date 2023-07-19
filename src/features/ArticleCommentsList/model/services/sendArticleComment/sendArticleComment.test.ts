// import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { sendArticleComment } from './sendArticleComment';
// import { Comment } from '@/entities/Comment';

// const body: DeepPartial<Comment> = {
// 	text: 'Hello',
// 	userId: '1',
// 	articleId: '1',
// };

// const data: DeepPartial<Comment> = {
// 	id: '1',
// 	text: 'Hello',
// 	userId: '1',
// 	articleId: '1',
// };

// describe('sendArticleComment.test', () => {
// 	test('Success load', async () => {
// 		const thunk = new TestAsyncThunk(sendArticleComment, {
// 			articleDetails: {
// 				data: {
// 					id: '1',
// 				},
// 			},
// 			user: {
// 				authData: {
// 					id: '1',
// 				},
// 			},
// 		});
// 		thunk.api.post.mockResolvedValue({ data });
// 		const action = await thunk.callThunk('Hello');

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
// 		expect(thunk.api.post).toHaveBeenCalled();
// 		expect(action.payload).toEqual(data);
// 		expect(action.meta.requestStatus).toBe('fulfilled');
// 	});
// 	test('Error load', async () => {
// 		const thunk = new TestAsyncThunk(sendArticleComment, {
// 			articleDetails: {
// 				data: {
// 					id: '1',
// 				},
// 			},
// 			user: {
// 				authData: {
// 					id: '1',
// 				},
// 			},
// 		});
// 		thunk.api.post.mockResolvedValue({ status: 403 });
// 		const action = await thunk.callThunk('Hello');

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// 		expect(thunk.api.post).toHaveBeenCalled();
// 		expect(action.payload).toEqual('error');
// 		expect(action.meta.requestStatus).toBe('rejected');
// 	});
// 	test('noData error', async () => {
// 		const thunk = new TestAsyncThunk(sendArticleComment, {});
// 		const action = await thunk.callThunk('Hello');

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// 		expect(thunk.api.post).not.toHaveBeenCalled();
// 		expect(action.payload).toEqual('noData');
// 		expect(action.meta.requestStatus).toBe('rejected');
// 	});
// 	test('noData error. Without userDAta', async () => {
// 		const thunk = new TestAsyncThunk(sendArticleComment, {
// 			articleDetails: {
// 				data: {
// 					id: '1',
// 				},
// 			},
// 		});
// 		const action = await thunk.callThunk('Hello');

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// 		expect(thunk.api.post).not.toHaveBeenCalled();
// 		expect(action.payload).toEqual('noData');
// 		expect(action.meta.requestStatus).toBe('rejected');
// 	});
// 	test('noData error. Without ArticleData', async () => {
// 		const thunk = new TestAsyncThunk(sendArticleComment, {
// 			user: {
// 				authData: {
// 					id: '1',
// 				},
// 			},
// 		});
// 		const action = await thunk.callThunk('Hello');

// 		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// 		expect(thunk.api.post).not.toHaveBeenCalled();
// 		expect(action.payload).toEqual('noData');
// 		expect(action.meta.requestStatus).toBe('rejected');
// 	});
// });
