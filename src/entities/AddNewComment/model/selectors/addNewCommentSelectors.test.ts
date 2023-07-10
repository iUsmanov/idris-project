import { StateSchema } from '@/app/providers/StoreProvider';
import { getAddNewCommentText } from './addNewCommentSelectors';

describe('getAddNewCommentText', () => {
	test('Should return Text', () => {
		const state: DeepPartial<StateSchema> = { addNewComment: { text: '123' } };
		expect(getAddNewCommentText(state as StateSchema)).toEqual('123');
	});
	test('With empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getAddNewCommentText(state as StateSchema)).toEqual('');
	});
});
// describe('getAddNewCommentError', () => {
// 	test('Should return true error', () => {
// 		const state: DeepPartial<StateSchema> = { addNewComment: { error: 'error' } };
// 		expect(getAddNewCommentError(state as StateSchema)).toEqual('error');
// 	});
// 	test('With empty state', () => {
// 		const state: DeepPartial<StateSchema> = {};
// 		expect(getAddNewCommentError(state as StateSchema)).toEqual(undefined);
// 	});
// });
