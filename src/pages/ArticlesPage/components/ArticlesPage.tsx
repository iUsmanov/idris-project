import { memo } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { PageMainContent } from '@/widgets/PageMainContent';
import {
	ArticlesInfiniteList,
	getArticlesInfiniteListError,
	getArticlesInfiniteListIsLoading,
} from '@/widgets/articlesInfiniteList';
import { ArticlesPageGreeting } from '@/features/articlesPageGreeting';

export const ArticlesPage = memo(() => {
	const dispatch = useAppDispatch();
	const error = useSelector(getArticlesInfiniteListError);
	const isLoading = useSelector(getArticlesInfiniteListIsLoading);

	return (
		<PageMainContent data-testid='ArticlesPage'>
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
