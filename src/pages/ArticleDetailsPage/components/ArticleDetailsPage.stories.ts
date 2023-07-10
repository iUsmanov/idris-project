import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetailsPage } from './ArticleDetailsPage';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Article } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Dictionary } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';
import Image from '@/shared/assets/tests/storybook.jpg';

const article: Article = {
	id: '1',
	title: 'Javascript news СВЕЖАЯ',
	subtitle: 'Что нового в JS за 2022 год?',
	img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png',
	views: 1022,
	createdAt: '26.04.2022',
	userId: '1',
	type: ['IT'],
	blocks: [
		{
			id: '1',
			type: 'TEXT',
			title: 'Заголовок этого блока',
			paragraphs: [
				'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
				'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
				'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
			],
		},
		{
			id: '2',
			type: 'IMAGE',
			src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
			title: 'Рисунок 1 - скриншот сайта',
		},
		{
			id: '3',
			type: 'CODE',
			code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
		},
	],
};

const entities: Dictionary<Comment> = {
	'1': {
		id: '1',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	'2': {
		id: '2',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
	'3': {
		id: '3',
		text: 'some comment',
		articleId: '1',
		userId: '1',
		user: {
			avatar: Image,
		},
	},
};

const meta = {
	title: 'pages/ArticleDetailsPage',
	component: ArticleDetailsPage,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [
		StoreDecorator({
			articleDetails: { data: article, error: undefined },
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
	parameters: {
		router: {
			path: '/articles/:id',
			route: '/articles/1',
		},
	},
} satisfies Meta<typeof ArticleDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
	args: {},
	decorators: [],
};

export const Dark: Story = {
	args: {},
	decorators: [ThemeDecorator('app-dark-theme')],
};

export const Orange: Story = {
	args: {},
	decorators: [ThemeDecorator('app-orange-theme')],
};

export const CommentsLoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: {},
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: true,
				isSendLoading: false,
			},
			articleDetails: { data: article, error: undefined },
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const SendLoadingLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: true,
			},
			articleDetails: { data: article, error: undefined },
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const CommenstErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: 'error',
				sendError: undefined,
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: { data: article, error: undefined },
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};

export const SendErrorLight: Story = {
	args: {},
	decorators: [
		StoreDecorator({
			articleCommentsList: {
				ids: ['1', '2', '3'],
				entities: entities,
				commentsError: undefined,
				sendError: 'error',
				isCommentsLoading: false,
				isSendLoading: false,
			},
			articleDetails: { data: article, error: undefined },
			addNewComment: {
				text: 'Some text',
			},
		}),
	],
};
