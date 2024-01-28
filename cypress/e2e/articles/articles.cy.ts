import { getRouteArticles } from '../../../src/shared/const/router';

describe('ArticlesPage', () => {
	beforeEach(() => {
		cy.login('ADMIN');
		cy.visit(getRouteArticles());
	});
	it('Статьи успешно подгрузились', () => {
		cy.getByTestId('ArticleList.TILE').should('exist');
		cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 8);
	});
	it('Статьи успешно подгрузились (на стабах)', () => {
		cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
		cy.getByTestId('ArticleList.TILE').should('exist');
		cy.getByTestId('ArticleListItem.TILE').should('have.length.greaterThan', 8);
	});
	it.skip('Тест, который будет падать', () => {
		cy.get('abrakadabra').should('exist');
	});
});
