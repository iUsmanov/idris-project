import { User } from './model/types/user';

export const mockUser: User = {
	id: '1',
	username: 'admin',
	roles: ['ADMIN'],
	features: {
		isArticleRatingEnabled: true,
		isCounterEnabled: true,
		isBeautyDesign: true,
	},
	avatar:
		'https://static.wixstatic.com/media/103d43_9ecc1086f64147b9afe8a9c3333b1a1a~mv2.jpg/v1/fill/w_640,h_620,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/103d43_9ecc1086f64147b9afe8a9c3333b1a1a~mv2.jpg',
	jsonSettings: {
		isArticlesPageWasOpened: true,
		theme: 'app-dark-theme',
	},
};
