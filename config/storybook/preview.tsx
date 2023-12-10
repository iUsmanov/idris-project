import type { Preview } from '@storybook/react';
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator';
import { I18nDecorator } from '@/shared/config/storybook/I18nDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		// mockAddonConfigs: {
		// 	globalMockData: [
		// 		{
		// 			// An array of mock objects which will add in every story
		// 			url: `https://storybook-api.story/notifications`,
		// 			method: 'GET',
		// 			status: 200,
		// 			response: {
		// 				data: mockNotifications,
		// 			},
		// 		},
		// 		{
		// 			url: `https://storybook-api.story/article-ratings?userId=&articleId=1`,
		// 			method: 'GET',
		// 			status: 200,
		// 			response: {
		// 				data: [mockRating, mockRating],
		// 			},
		// 		},
		// 		{
		// 			url: `https://storybook-api.story/articles?_limit=8&_expand=user`,
		// 			method: 'GET',
		// 			status: 200,
		// 			response: { data: mockArticles },
		// 		},
		// 	],
		// 	ignoreQueryParams: false, // Whether or not to ignore query parameters globally
		// 	refreshStoryOnUpdate: false, // This property re-renders the story if there's any data changes
		// 	disableUsingOriginal: false, // This property disables the toggle (on/off) option to use the original endpoint
		// 	disable: true, // This property disables the panel from all the stories
		// },
	},
	decorators: [
		SuspenseDecorator,
		StyleDecorator,
		ThemeDecorator('app-light-theme'),
		RouterDecorator,
		I18nDecorator,
		StoreDecorator(),
		FeatureFlagsDecorator({}),
	],
};

export const globalTypes = {
	locale: {
		name: 'Locale',
		description: 'Internationalization locale',
		toolbar: {
			icon: 'globe',
			items: [
				{ value: 'en', title: 'English' },
				{ value: 'ru', title: 'Русский' },
			],
			showName: true,
		},
	},
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		toolbar: {
			// https://5a375b97f4b14f0020b0cda3-wbeulgbetj.chromatic.com/?path=/story/basics-icon--labels
			icon: 'circlehollow',
			items: [
				{ value: 'app-light-theme', title: 'Light' },
				{ value: 'app-dark-theme', title: 'Dark' },
				{ value: 'app-orange-theme', title: 'Orange' },
			],
			showName: true,
			dynamicTitle: true,
		},
	},
};

export default preview;
