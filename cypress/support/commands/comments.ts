export const addComment = (commentText: string) => {
	cy.getByTestId('AddNewComment').within(() => {
		cy.get('input').type(commentText);
		cy.get('button').click();
	});
};

declare global {
	namespace Cypress {
		interface Chainable {
			addComment(commentText: string): Chainable<void>;
		}
	}
}
