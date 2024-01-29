import { getRouteArticleDetails } from '../../../src/shared/const/router';

let currentArticleId = '';
describe('ArticleDetails', () => {
	beforeEach(() => {
		cy.login('ADMIN');
		cy.createArticle().then((article) => {
			currentArticleId = article.id;
			cy.visit(getRouteArticleDetails(currentArticleId));
		});
	});
	afterEach(() => {
		cy.removeArticle(currentArticleId);
	});
	it('Статья загрузилась', () => {
		cy.getByTestId('ArticleDetails').should('exist');
	});
	it('Список рекомендаций отоброзился', () => {
		cy.getByTestId('ArticleRecommendations').should('exist');
	});
	it('Отправка комментария', () => {
		const commentText = 'commentText';
		cy.getByTestId('AddNewComment').scrollIntoView();
		cy.addComment(commentText);
		cy.getByTestId('CommentCard.Text').should('have.length', 1);
	});
	it('Оставление отзыва', () => {
		const feedback = 'feedbackText';
		cy.getByTestId('RatingCard').scrollIntoView();
		cy.setRate(5, feedback);
		cy.get('[data-test-selected=true]').should('have.length', 5);
	});
	it('Оставление отзыва (на стабах)', () => {
		const feedback = 'feedbackText';
		cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
		cy.getByTestId('RatingCard').scrollIntoView();
		cy.setRate(5, feedback);
		cy.get('[data-test-selected=true]').should('have.length', 5);
	});
});
