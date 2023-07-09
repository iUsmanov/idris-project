import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/addNewCommentSlice';

export const getAddNewCommentText = (state: StateSchema) =>
	state?.addNewComment?.text || initialState.text;
export const getAddNewCommentError = (state: StateSchema) => state?.addNewComment?.error;
