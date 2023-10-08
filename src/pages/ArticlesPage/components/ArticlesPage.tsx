import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import {
	ArticlesInfiniteList,
	fetchNextArticlesPage,
	getArticlesInfiniteListError,
} from '@/widgets/articlesInfiniteList';
import { ArticlesPageGreeting } from '@/features/articlesPageGreeting';

export const ArticlesPage = memo(() => {
	const dispatch = useAppDispatch();
	const error = useSelector(getArticlesInfiniteListError);

	const onLoadNextPart = useCallback(() => {
		if (__ENVIRON__ !== 'storybook') {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch]);

	return (
		<Page onScrollEnd={onLoadNextPart} data-testid='ArticlesPage'>
			<ArticlesInfiniteList />
			{/* Не забывать, что если здесь появится контент, который будет ниже, использовать констркуцию {!error && <>{JSX}</>} */}
			{!error && (
				<>
					<ArticlesPageGreeting />
				</>
			)}
		</Page>
	);
});
