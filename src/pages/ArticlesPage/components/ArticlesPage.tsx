import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { PageMainContent } from '@/widgets/PageMainContent';
import {
	ArticlesInfiniteList,
	fetchNextArticlesPage,
	getArticlesInfiniteListError,
	getArticlesInfiniteListIsLoading,
} from '@/widgets/articlesInfiniteList';
import { ArticlesPageGreeting } from '@/features/articlesPageGreeting';

export const ArticlesPage = memo(() => {
	const dispatch = useAppDispatch();
	const error = useSelector(getArticlesInfiniteListError);
	const isLoading = useSelector(getArticlesInfiniteListIsLoading);

	const onLoadNextPart = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch]);

	return (
		<PageMainContent onScrollEnd={!isLoading ? onLoadNextPart : undefined} data-testid='ArticlesPage'>
			<ArticlesInfiniteList />
			{/* Не забывать, что если здесь появится контент, который будет ниже, использовать констркуцию {!error && <>{JSX}</>} */}
			{!error && (
				<>
					<ArticlesPageGreeting />
				</>
			)}
		</PageMainContent>
	);
});
