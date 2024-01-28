/// <reference types="cypress" />

import * as login from './commands/login';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';
import * as articleDetailsCommands from './commands/article-details';
import * as commentsCommands from './commands/comments';
import * as ratingCommands from './commands/rating';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.addAll(login);
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleDetailsCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
//
// -- This is a parent command --
// Cypress.Commands.add('login', login);
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
// 	namespace Cypress {
// 		interface Chainable {
// 			login(role: UserRole): Chainable<void>;
// 			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// 			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
// 			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
// 		}
// 	}
// }

// export {};
