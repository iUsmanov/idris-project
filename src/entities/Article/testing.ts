import { mockArticlesEntities } from './mocks';
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from './model/types/article';
export type { Article } from './model/types/article';
export { articleDetailsReducer } from './model/slice/articleDetailsSlice';
import { mockArticles, mockArticle } from './mocks';

const code = `import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { Code } from '@/shared/components/Code';

interface ArticleCodeBlockComponentProps {
	className?: string;
	block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponentProps) => {
	const { className, block } = props;

	return (
		<div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
			<Code text={block.code} />
		</div>
	);
});
`;

const paragraphs = [
	'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
	'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
	'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
];

export const mockArticleBlockCode: ArticleCodeBlock = {
	id: '1',
	type: 'CODE',
	code,
};

export const mockArticleBlockImage: ArticleImageBlock = {
	id: '1',
	title: 'Title',
	type: 'IMAGE',
	src: 'pathToImage',
};

export const mockArticleBlockText: ArticleTextBlock = {
	id: '1',
	type: 'TEXT',
	title: 'Title',
	paragraphs,
};

export { mockArticlesEntities, mockArticles, mockArticle };
