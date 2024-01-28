export const setRate = (rating: number = 5, feedback: string = 'feedback') => {
	cy.getByTestId('StarRating.5').click();
	// cy.getByTestId('FeedbackInput').click()
	cy.getByTestId('FeedbackInput').type(feedback);
	cy.getByTestId('RatingCard.SendButton').click();
	// cy.getByTestId('AddNewComment').within(() => {
	// 	cy.get('input').type(commentText);
	// 	cy.get('button').click();
	// });
};

declare global {
	namespace Cypress {
		interface Chainable {
			setRate(rating: number, feedback: string): Chainable<void>;
		}
	}
}
