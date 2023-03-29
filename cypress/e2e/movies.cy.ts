describe('Mostly Mundane Movies', () => {

	context('happy path', () => {
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

		it('should show a loading spinner while searching for a movie', () => {
			cy.get('.form-control')
				.type(`The Matrix{enter}`)

			cy.get('#loading-wrapper')
				.should('be.visible')
		})

		it('should be able to click on the first movie after a successful search and the page you are directed to should match the ID of the movie', () => {
			cy.get('.form-control')
				.type(`The Matrix{enter}`)

			// find the `[data-imdb-id]` of the first movie of the page
			cy.get('.movie-list-item')
				.first()
				.find('[data-imdb-id]')
				.then(($id) => {
					const dataImdbId = $id.attr('data-imdb-id')

					// click on the `View Details`-link on first movie of the page
					cy.get(':nth-child(1) > .card > .card-body > .card-link')
					.click()

					// find the id in the url
					cy.url().should('include', dataImdbId)
				})
		})
	})

	context('unhappy path', () => {
		beforeEach(() => {
			cy.visit('/')
		})

		it.skip('should search for "Isaks Memes" and expect not to get any hits', () => {

		})

		it.skip('should search for "the postman always rings twice" and expect the request to make a timeout', () => {

		})

		it.skip('should show an error message when entering the url for the movie with id "tt1337"', () => {

		})

		it.skip('should show an error message when entering a page that does not exist', () => {

		})

		/**
		 * Last step:
		 * Mock a search request for The Matrix and a GET request in Cypress (there is two different requests),
		 * and answer with data from two fixtures
		*/
	})
})
