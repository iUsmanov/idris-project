import { User } from '@/entities/User';

export type ArticleType = 'ALL' | 'IT' | 'ECONOMICS' | 'SCIENCE';
export type ArticleBlockType = 'TEXT' | 'IMAGE' | 'CODE';

export interface ArticleBlockBase {
	id: string;
	type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBlockBase {
	type: 'TEXT';
	title?: string;
	paragraphs: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
	type: 'IMAGE';
	src: string;
	title: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
	type: 'CODE';
	code: string;
}

export type ArticleBlock = ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock;

export interface Article {
	id: string;
	title: string;
	subtitle: string;
	img: string;
	views: number;
	createdAt: string;
	userId: string;
	type: ArticleType[];
	blocks: ArticleBlock[];
	user: User;
}

export type ArticleView = 'TILE' | 'LIST';
