import { useRouteChange } from '@/shared/lib/router/useRouteChange/useRouteChange';
import { AppRoutes } from '@/shared/types/router';
import { ScrollToolbar } from '@/widgets/scrollToolbar';
import { ReactElement } from 'react';

export function useAppToolbar() {
	const currentRoute = useRouteChange();

	const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
		articles: <ScrollToolbar />,
		article_details: <ScrollToolbar />,
		main: <div>MAINTOOLBAR</div>,
		about: <div>ABOUTTOOLBAR</div>,
	};

	return toolbarByAppRoute[currentRoute];
}
