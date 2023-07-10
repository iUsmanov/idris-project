import { ArticleCommentsListSchema } from '@/features/ArticleCommentsList';
import { sendArticleComment } from '../services/sendArticleComment/sendArticleComment';
import { articleCommentsReducer } from './articleCommentsSlice';

describe('articleCommentsSlice.test', () => {
	test('sendArticleComment rejected', () => {
		const state: DeepPartial<ArticleCommentsListSchema> = {
			error: undefined,
		};
		const expects: DeepPartial<ArticleCommentsListSchema> = {
			error: 'error',
		};
		expect(
			articleCommentsReducer(
				state as ArticleCommentsListSchema,
				sendArticleComment.rejected(null, '', '', 'error')
			)
		).toEqual(expects);
	});
});
