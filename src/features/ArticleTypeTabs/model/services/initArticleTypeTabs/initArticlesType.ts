import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleType } from '@/entities/Article';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { articlesTypeActions } from '../../slice/articlesTypeSlice';

export const initArticlesType = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
	'articlesType/initArticlesType',
	async (searchParams, thunkAPI) => {
		const { dispatch } = thunkAPI;

		const typeFromURL = searchParams.get('type') as ArticleType;

		if (typeFromURL) {
			dispatch(articlesTypeActions.setType(typeFromURL));
		}
	}
);
