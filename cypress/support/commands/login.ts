import { LOCAL_STORAGE_USER_KEY } from 'C:/Users/PC95/Desktop/frontend/idris-project/src/shared/const/localStorage.ts';
import { UserRole } from 'C:/Users/PC95/Desktop/frontend/idris-project/src/entities/User/model/types/user';

export const login = (role: UserRole) => {
	let token: string = '4';
	switch (role) {
		case 'ADMIN':
			token = '4';
	}

	window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, token);
	return token;
};

declare global {
	namespace Cypress {
		interface Chainable {
			login(role: UserRole): Chainable<string>;
		}
	}
}

// export const login = (username: string = 'testuser', password: string = '123') => {
// 	cy.request({
// 		method: 'POST',
// 		url: `http://localhost:8000/login`,
// 		body: {
// 			username,
// 			password,
// 		},
// 	}).then(({ body }) => {
// 		window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(body));
// 	});
// };

// export const login = (username: string = 'testuser', password: string = '123') => {
// 	console.log('=========================================');
// 	cy.contains('Войти').click();
// 	cy.get('input').first().type(username);
// 	cy.get('input').last().type(password);
// 	cy.get('[data-testid=LoginForm]').contains('Войти').click();
// };
