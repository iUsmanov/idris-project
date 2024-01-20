/**
 * SuspenseDecorator предназначен для того, чтобы стори-кейс не рендерился
 * сразу, а ждал каких-то загрузок. Загружаться могут, например, переводы.
 *
 * */

import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (Story: StoryFn) => {
	return (
		<Suspense>
			<Story />
		</Suspense>
	);
};
