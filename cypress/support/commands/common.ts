export const getByTestId = (testId: string) => {
	return cy.get(`[data-testid='${testId}']`);
};

declare global {
	namespace Cypress {
		interface Chainable {
			getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
		}
	}
}
