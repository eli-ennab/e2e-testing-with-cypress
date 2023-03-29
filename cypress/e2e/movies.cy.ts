describe('Mostly Mundane Movies', () => {

	context('initial state', () => {
		beforeEach(() => {
			cy.visit('/')
		})

		it('should not be able to search for movies without a title', () => {
			cy.get('[type="submit"]')
				.click()

			cy.get('.alert')
				.should('be.visible')
				.contains('You tried to search, good for you! 👀')
		})

		it.skip('should not be able to search without a title less than 3 chars', () => {

		})

		it.skip('should be able to search for the The Matrix and find X number of movies', () => {

		})

		it.skip('should show a loading spinner while searching for a movie', () => {

		})

		it.skip('should be able to click on the first movie after a successful search and the page you are directed to should match the ID of the movie', () => {

		})

	})
})
