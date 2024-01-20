// #i18next
/**
 * I18nDecorator предназначен для того, чтобы переводы работали и
 * в сторибуке, и чтобы мы могли переключать языки. Здесь используется
 * специальный конфиг i18n для сторибука.
 *
 *
 *
 * */

import { StoryContext, StoryFn } from '@storybook/react';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18nForStorybook';

export const I18nDecorator = (Story: StoryFn, context: StoryContext) => {
	const { locale } = context.globals;

	// When the locale global changes
	// Set the new locale in i18n
	useEffect(() => {
		i18n.changeLanguage(locale);
	}, [locale]);

	return (
		<Suspense fallback={<div>loading translations...</div>}>
			<I18nextProvider i18n={i18n}>
				<Story />
			</I18nextProvider>
		</Suspense>
	);
};
