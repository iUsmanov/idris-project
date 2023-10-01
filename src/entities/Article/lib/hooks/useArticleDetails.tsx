import { useCallback, useMemo } from 'react';
import { ReducersList, useDynamicModule } from '@/shared/lib/hooks/useDynamicModule/useDynamicModule';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ArticleTextBlockComponent } from '../../components/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../../components/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleCodeBlockComponent } from '../../components/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/types/article';

export function useArticleDetails(articleId: string | undefined, cls: Record<string, string>) {
	const dispatch = useAppDispatch();

	const reducers = useMemo<ReducersList>(
		() => ({
			articleDetails: articleDetailsReducer,
		}),
		[]
	);

	useDynamicModule({ reducers });

	useInitialEffect(() => {
		if (!articleId) return;
		dispatch(fetchArticleById(articleId));
	});

	const renderArticleBlock = useCallback(
		(block: ArticleBlock) => {
			switch (block.type) {
				case 'TEXT':
					return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
				case 'IMAGE':
					return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block} />;
				case 'CODE':
					return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block} />;
				default:
					return null;
			}
		},
		[cls.block]
	);

	return {
		renderArticleBlock,
	};
}
