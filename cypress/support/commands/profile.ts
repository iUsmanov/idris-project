/**
 * updateProfile обновляет профиль как локально,
 * так и на сервере тоже.
 * */
export const updateProfile = (newFirstName: string, newLastName: string) => {
	cy.getByTestId('EditableProfileCardHeader.EditButton').click();

	cy.getByTestId('ProfileCard.InputFirstName').clear();
	cy.getByTestId('ProfileCard.InputLastName').clear();

	cy.getByTestId('ProfileCard.InputFirstName').type(newFirstName);
	cy.getByTestId('ProfileCard.InputLastName').type(newLastName);

	cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

/**
 * resetProfile не нажимает на кнопку 'Отменить изменения',
 * а возвращает изменённый профиль на сервере к прежнему состоянию.
 * */
export const resetProfile = (profileId: string) => {
	cy.request({
		url: `http://localhost:8000/profiles/${profileId}`,
		method: 'PUT',
		headers: { Authorization: 'someText' },
		body: {
			id: '4',
			first: 'test',
			lastname: 'user',
			age: 465,
			currency: 'EUR',
			country: 'Ukraine',
			city: 'Moscow',
			username: 'testuser',
			avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
		},
	});
};

declare global {
	namespace Cypress {
		interface Chainable {
			updateProfile(newFirstName: string, newLastName: string): Chainable<void>;
			resetProfile(profileId: string): Chainable<void>;
		}
	}
}
