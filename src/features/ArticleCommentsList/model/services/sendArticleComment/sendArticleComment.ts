import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { fetchArticleCommentsByArticleId } from '../fetchArticleCommentsByArticleId/fetchArticleCommentsByArticleId';

interface SendArticleCommentProps {
	text: string;
	articleId: string;
}

export const sendArticleComment = createAsyncThunk<
	Comment,
	SendArticleCommentProps,
	ThunkConfig<string>
>('articleComments/sendArticleComment', async (props, thunkAPI) => {
	const { rejectWithValue, extra, getState, dispatch } = thunkAPI;
	const { articleId, text } = props;

	const user = getUserAuthData(getState());

	if (!text || !user || !articleId) {
		return rejectWithValue('noData');
	}

	const body: DeepPartial<Comment> = {
		text,
		userId: user.id,
		articleId: articleId,
	};

	try {
		const response = await extra.api.post<Comment>(`/comments`, body);

		if (!response.data) {
			throw new Error();
		}

		dispatch(fetchArticleCommentsByArticleId(articleId));
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
