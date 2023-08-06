import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

interface GetArticleArg {
	userId: string;
	articleId: string;
}

interface PostArticleArg {
	userId: string;
	articleId: string;
	rate: number;
	feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getArticleRating: build.query<Rating[], GetArticleArg>({
			query: ({ userId, articleId }) => ({
				url: '/article-ratings',
				params: {
					userId,
					articleId,
				},
			}),
		}),
		postArticleRating: build.mutation<void, PostArticleArg>({
			query: (arg) => ({
				url: '/article-ratings',
				method: 'POST',
				body: arg,
			}),
		}),
	}),
});

export const { useGetArticleRatingQuery } = articleRatingApi;
export const { usePostArticleRatingMutation } = articleRatingApi;
