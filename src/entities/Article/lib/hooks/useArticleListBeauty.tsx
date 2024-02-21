import { HTMLAttributeAnchorTarget, useCallback, useEffect, useRef, useState } from 'react';
import cls from '../../components/ArticleList/Beauty/ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { SESSION_STORAGE_CURRENT_ARTICLE_ID_KEY } from '@/shared/const/sessionStorage';
import { VirtuosoGridHandle } from 'react-virtuoso';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { ArticleListSkeleton } from '../../components/ArticleList/Beauty/ArticleListSkeleton';
import { getTilesQuantity } from '../helpers/getTilesQuantity';

interface UseArticleListBeautyProps {
	className?: string;
	articles?: Article[];
	isLoading?: boolean;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	endReached?: VoidFunction;
	virtualization: boolean;
}

export const useArticleListBeauty = (props: UseArticleListBeautyProps) => {
	const { className, articles, isLoading, view, target, virtualization, endReached } = props;
	const [currentArticleId, setCurrentArticleId] = useState<number>(1);
	const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<ArticleListItem
					target={target}
					key={article.id}
					article={article}
					view={view}
					className={cls.card}
				/>
			);
		},
		[target, view]
	);

	const renderArticleVirtualization = useCallback(
		(index: number, article: Article) => {
			return (
				<div style={view === 'TILE' ? { height: 350, width: 240 } : { minHeight: 500 }}>
					<ArticleListItem
						target={target}
						key={article.id}
						article={article}
						view={view}
						className={cls.card}
						index={index}
					/>
				</div>
			);
		},
		[target, view]
	);

	const Footer = () => {
		if (isLoading) {
			return <ArticleListSkeleton view={view} className={className} />;
		}

		return null;
	};

	const renderArticles = articles && articles.length && articles.map(renderArticle);
	const renderSkeletons = isLoading && <ArticleListSkeleton view={view} className={className} />;

	useEffect(() => {
		if (!virtualization) return;
		const currentArticleIdFromSessionStorage =
			Number(sessionStorage.getItem(SESSION_STORAGE_CURRENT_ARTICLE_ID_KEY)) ?? 0;

		setCurrentArticleId(currentArticleIdFromSessionStorage);
	}, [virtualization, view]);

	useEffect(() => {
		if (!virtualization) return;
		let timeout: any;
		if (view === 'TILE') {
			timeout = setTimeout(() => {
				if (virtuosoGridRef.current) {
					virtuosoGridRef.current.scrollToIndex(currentArticleId);
				}
			}, 100);
		}

		return () => clearTimeout(timeout);
	}, [currentArticleId, view, virtualization]);

	useEffect(() => {
		if (articles && articles?.length < getTilesQuantity()) {
			endReached?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

	return {
		renderArticleVirtualization,
		renderArticles,
		renderSkeletons,
		Footer,
		currentArticleId,
		virtuosoGridRef,
	};
};
/* 

import { HTMLAttributeAnchorTarget, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cls from '../../components/ArticleList/Beauty/ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { SESSION_STORAGE_CURRENT_ARTICLE_ID_KEY } from '@/shared/const/sessionStorage';
import { VirtuosoGridHandle } from 'react-virtuoso';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { ArticleListSkeleton } from '../../components/ArticleList/Beauty/ArticleListSkeleton';

interface UseArticleListBeautyProps {
	className?: string;
	articles?: Article[];
	isLoading?: boolean;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
	endReached?: VoidFunction;
	virtualization: boolean;
}

export const useArticleListBeauty = (props: UseArticleListBeautyProps) => {
	const { className, articles, isLoading, view, target, virtualization, endReached } = props;
	const [currentArticleId, setCurrentArticleId] = useState<number>(1);
	const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<ArticleListItem
					target={target}
					key={article.id}
					article={article}
					view={view}
					className={cls.card}
				/>
			);
		},
		[target, view]
	);

	const renderArticleVirtualization = useCallback(
		(index: number, article: Article) => {
			return (
				<div style={view === 'TILE' ? { height: 350, width: 240 } : { minHeight: 300 }}>
					<ArticleListItem
						target={target}
						key={article.id}
						article={article}
						view={view}
						className={cls.card}
						index={index}
					/>
				</div>
			);
		},
		[target, view]
	);

	const Footer = useCallback(() => {
		if (isLoading) {
			return <ArticleListSkeleton view={view} className={className} />;
		}

		return null;
	}, [className, isLoading, view]);

	const renderArticles = articles && articles.length && articles.map(renderArticle);
	const renderSkeletons = useMemo(
		() => isLoading && <ArticleListSkeleton view={view} className={className} />,
		[className, isLoading, view]
	);

	useEffect(() => {
		if (!virtualization) return;
		const currentArticleIdFromSessionStorage =
			Number(sessionStorage.getItem(SESSION_STORAGE_CURRENT_ARTICLE_ID_KEY)) ?? 0;

		setCurrentArticleId(currentArticleIdFromSessionStorage);
	}, [virtualization, view]);

	useEffect(() => {
		if (!virtualization) return;
		let timeout: any;
		if (view === 'TILE') {
			timeout = setTimeout(() => {
				if (virtuosoGridRef.current) {
					virtuosoGridRef.current.scrollToIndex(currentArticleId);
				}
			}, 100);
		}

		return () => clearTimeout(timeout);
	}, [currentArticleId, view, virtualization]);

	useEffect(() => {
		if (articles && articles?.length < 9) {
			endReached?.();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [view]);

	const result = useMemo(
		() => ({
			renderArticleVirtualization,
			renderArticles,
			renderSkeletons,
			Footer,
			currentArticleId,
			virtuosoGridRef,
		}),
		[Footer, currentArticleId, renderArticleVirtualization, renderArticles, renderSkeletons]
	);

	return result;
};


*/
