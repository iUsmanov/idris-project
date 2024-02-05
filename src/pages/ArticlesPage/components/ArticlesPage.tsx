import { memo } from 'react';
import { useSelector } from 'react-redux';
import { PageMainContent } from '@/widgets/PageMainContent';
import { ArticlesInfiniteList, getArticlesInfiniteListError } from '@/widgets/articlesInfiniteList';
import { ArticlesPageGreeting } from '@/features/articlesPageGreeting';

export const ArticlesPage = memo(() => {
	const error = useSelector(getArticlesInfiniteListError);

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
