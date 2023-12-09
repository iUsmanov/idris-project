import { AddNewCommentSchema } from '../types/addNewComment';
import { addNewCommentActions, addNewCommentReducer } from './addNewCommentSlice';

describe('addNewCommentSlice.test', () => {
	test('set text', () => {
		const state: DeepPartial<AddNewCommentSchema> = {
			text: '',
		};
		const payload = '123';
		const expects = {
			text: '123',
		};
		expect(
			addNewCommentReducer(state as AddNewCommentSchema, addNewCommentActions.setText(payload))
		).toEqual(expects);
	});
});
