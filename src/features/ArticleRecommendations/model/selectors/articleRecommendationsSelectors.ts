import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice/articleRecommendationsSlice';

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
	state.articleRecommendations?.isLoading || initialState.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) =>
	state.articleRecommendations?.error;
