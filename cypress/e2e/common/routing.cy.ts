import {
	getRouteArticles,
	getRouteMain,
	getRouteProfile,
} from 'C:/Users/PC95/Desktop/frontend/idris-project/src/shared/const/router.ts';

describe('Роутинг', () => {
	describe('Пользователь не авторизован', () => {
		it('Переход на главную страницу', () => {
			cy.visit(getRouteMain());
			cy.get('[data-testid=MainPage]').should('exist');
		});

		it('Переход на профильную страницу', () => {
			cy.visit(getRouteProfile('1'));
			cy.get('[data-testid=ForbiddenPage]').should('exist');
		});

		it('Попытка перейти на несуществующий маршрут', () => {
			cy.visit('abrakadabra');
			cy.get('[data-testid=NotFoundPage]').should('exist');
		});
	});
	// ==================================================
	describe('Пользователь авторизован', () => {
		beforeEach(() => {
			cy.login('ADMIN');
		});
		it('Переход на профильную страницу', () => {
			cy.visit(getRouteProfile('1'));
			cy.get('[data-testid=ProfilePage]').should('exist');
		});

		it('Переход на страницу статей', () => {
			cy.visit(getRouteArticles());
			cy.get('[data-testid=ArticlesPage]').should('exist');
		});
	});
});
