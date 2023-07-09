import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getUserAuthData } from '@/entities/User';
import { addNewCommentActions, getAddNewCommentText } from '@/features/AddNewComment';
import { getArticleDetailsData } from '@/entities/Article/model/selectors/articleDetailsSelectors';
import { fetchArticleCommentsByArticleId } from '@/features/ArticleCommentsList';

export const sendArticleComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
	'articleComments/sendArticleComment',
	async (_, thunkAPI) => {
		const { rejectWithValue, extra, getState, dispatch } = thunkAPI;

		const article = getArticleDetailsData(getState());
		const text = getAddNewCommentText(getState());
		const user = getUserAuthData(getState());

		if (!text || !user || !article) {
			return rejectWithValue('noData');
		}

		const body: DeepPartial<Comment> = {
			text,
			userId: user.id,
			articleId: article.id,
		};

		try {
			const response = await extra.api.post<Comment>(`/comments`, body);

			if (!response.data) {
				throw new Error();
			}

			dispatch(addNewCommentActions.setText(''));
			dispatch(fetchArticleCommentsByArticleId(article.id));
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
