import { getRouteProfile } from '../../../src/shared/const/router';

describe('Работа с профилем', () => {
	let profileId = '';
	beforeEach(() => {
		cy.login('ADMIN').then((token) => {
			profileId = token;
			cy.visit(getRouteProfile(token));
		});
	});
	afterEach(() => {
		cy.resetProfile(profileId);
	});
	it('Профиль успешно загружается', () => {
		cy.getByTestId('ProfileCard').should('exist');
		cy.getByTestId('ProfileCard.InputFirstName').should('have.value', 'test');
	});
	it('Пользователь редактирует профиль', () => {
		const newFirstName = 'newFirstName';
		const newLastName = 'newLastName';

		cy.updateProfile(newFirstName, newLastName);
		cy.getByTestId('ProfileCard.InputFirstName').should('have.value', newFirstName);
		cy.getByTestId('ProfileCard.InputLastName').should('have.value', newLastName);
	});
});
