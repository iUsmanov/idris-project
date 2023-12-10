import { mockArticles } from '@/entities/Article/testing';
import { mockNotifications } from '@/entities/Notification/testing';
import { mockRating } from '@/features/articleRating/testing';

export const mockStorybookGetNotificationsSuccess = {
	url: `${__API__}/notifications`,
	method: 'GET',
	status: 200,
	response: mockNotifications,
};

export const mockStorybookGetArticleRatingSuccess = {
	url: `${__API__}/article-ratings?userId=&articleId=1`,
	method: 'GET',
	status: 200,
	response: [mockRating, mockRating],
};

export const mockStorybookGetArticleRecommendationsSuccess = {
	url: `${__API__}/articles?_limit=8&_expand=user`,
	method: 'GET',
	status: 200,
	response: mockArticles,
};
