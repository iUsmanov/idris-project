export interface Comment {
	id: string;
	text: string;
	articleId: string;
	userId: string;
	user?: {
		avatar: string;
	};
}
