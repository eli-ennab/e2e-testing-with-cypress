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

		it('should not be able to search without a title less than 3 chars', () => {
			cy.get('.form-control')
				.type(`it{enter}`)

			cy.get('.alert')
				.should('be.visible')
				.contains('Search query must be at least 3 characters long, duh ^^ 🙄')
		})

		it('should be able to search for the The Matrix and get at least 10 movies', () => {
			cy.get('.form-control')
				.type(`The Matrix{enter}`)

			cy.get(':nth-child(10)')
				.should('exist')

			cy.get('.py-3')
				.find(':nth-child(10)')
				.should('exist')
		})

		it.skip('should show a loading spinner while searching for a movie', () => {

		})

		it.skip('should be able to click on the first movie after a successful search and the page you are directed to should match the ID of the movie', () => {

		})

	})
})
