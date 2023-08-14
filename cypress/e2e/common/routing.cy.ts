import { selectByTestId } from './../../helpers/selectBy';
describe('Routing', () => {
	describe('Пользователь авторизован', () => {
		beforeEach(() => {
			cy.login();
		});
		it('Visit MainPage', () => {
			cy.visit('/');
			cy.get(selectByTestId('MainPage')).should('exist');
		});
		it('Visit ProfilePage', () => {
			cy.visit('/profiles/1');
			cy.get(selectByTestId('ProfilePage')).should('exist');
		});
		it('Visit ArticlesPage', () => {
			cy.visit('/articles');
			cy.get(selectByTestId('ArticlesPage')).should('exist');
		});
	});

	describe('Пользователь не авторизован', () => {
		it('Visit MainPage', () => {
			cy.visit('/');
			cy.get(selectByTestId('MainPage')).should('exist');
		});
		it('Visit ProfilePage', () => {
			cy.visit('/profiles/1');
			cy.get(selectByTestId('ForbiddenPage')).should('exist');
		});
		it('Visit non-existent page', () => {
			cy.visit('/some-none-exist-page');
			cy.get(selectByTestId('NotFoundPage')).should('exist');
		});
	});
});
