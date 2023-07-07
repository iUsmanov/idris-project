import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticleCommentsByArticleId = createAsyncThunk<
	Comment[],
	string | undefined,
	ThunkConfig<string>
>('articleCommentsList/fetchArticleCommentsByArticleId', async (articleId, thunkAPI) => {
	const { rejectWithValue, extra } = thunkAPI;
	try {
		if (!articleId) {
			return rejectWithValue('error');
		}
		const response = await extra.api.get<Comment[]>('/comments', {
			params: {
				articleId,
				_expand: 'user',
			},
		});
		if (!response.data) {
			throw new Error();
		}
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
