/// <reference types="cypress" />

import { login } from './commands/login';
import * as commonCommands from './commands/common';
import * as profileCommands from './commands/profile';

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
// -- This is a parent command --
Cypress.Commands.add('login', login);
Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
//
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
