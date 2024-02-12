// eslint-disable-next-line fsd-paths-guard/public-api-imports
import { mockArticles } from '@/entities/Article/mocks';
import { PageMainContent } from '@/widgets/PageMainContent';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

export const MainPage = memo(() => {
	const { t } = useTranslation('main');

	return (
		<PageMainContent data-testid='MainPage'>
			<Virtuoso
				style={{ height: '100%' }}
				data={mockArticles}
				// endReached={endReached}
				itemContent={(index, item) => {
					return (
						<div style={{ height: 600 }}>
							{index}. {item.title}
						</div>
					);
				}}
				// initialTopMostItemIndex={currentArticleId}
				// components={{
				// 	Header,
				// 	Footer,
				// }}
			/>
		</PageMainContent>
	);
});
