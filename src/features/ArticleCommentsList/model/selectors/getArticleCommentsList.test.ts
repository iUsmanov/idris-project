import { StateSchema } from '@/app/providers/StoreProvider';
import {
	getArticleCommentsListCommentsError,
	getArticleCommentsListIsCommentsLoading,
	getArticleCommentsListIsSendLoading,
	getArticleCommentsListSendError,
} from './getArticleCommentsList';

describe('getArticleCommentsListIsCommentsLoading', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { isCommentsLoading: true } };
		expect(getArticleCommentsListIsCommentsLoading(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListIsCommentsLoading(state as StateSchema)).toEqual(false);
	});
});
describe('getArticleCommentsListCommentsError', () => {
	test('Should return true error', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { commentsError: 'error' } };
		expect(getArticleCommentsListCommentsError(state as StateSchema)).toEqual('error');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListCommentsError(state as StateSchema)).toEqual(undefined);
	});
});

describe('getArticleCommentsListIsSendLoading', () => {
	test('Should return true', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { isSendLoading: true } };
		expect(getArticleCommentsListIsSendLoading(state as StateSchema)).toEqual(true);
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListIsSendLoading(state as StateSchema)).toEqual(false);
	});
});
describe('getArticleCommentsListSendError', () => {
	test('Should return true error', () => {
		const state: DeepPartial<StateSchema> = { articleCommentsList: { sendError: 'error' } };
		expect(getArticleCommentsListSendError(state as StateSchema)).toEqual('error');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleCommentsListSendError(state as StateSchema)).toEqual(undefined);
	});
});
