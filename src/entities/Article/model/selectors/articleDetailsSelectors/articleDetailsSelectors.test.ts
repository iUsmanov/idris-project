import { StateSchema } from '@/app/providers/StoreProvider/testing';
import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading,
} from './articleDetailsSelectors';
import { Article } from '../../types/article';

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
	user: {
		id: '1',
		username: 'admin',
	},
};

describe('getArticleDetailsData', () => {
	test('getDataSuccess', () => {
		const state: DeepPartial<StateSchema> = {
			articleDetails: {
				data: article,
			},
		};
		expect(getArticleDetailsData(state as StateSchema)).toEqual(article);
	});
	test('getDataUndefined', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
	});
});

describe('getArticleDetailsError', () => {
	test('getErrorSuccess', () => {
		const state: DeepPartial<StateSchema> = {
			articleDetails: {
				error: 'error',
			},
		};
		expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
	});
	test('getErrorUndefined', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
	});
});

describe('getArticleDetailsIsLoading', () => {
	test('getIsLoadingTrue', () => {
		const state: DeepPartial<StateSchema> = {
			articleDetails: {
				isLoading: true,
			},
		};
		expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
	});
	test('getIsLoadingFalse', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(false);
	});
});
