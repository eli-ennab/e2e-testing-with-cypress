describe('Mostly Mundane Movies', () => {

	context.skip('happy path', () => {

		beforeEach(() => {
			cy.visit('/')
		})

		it('should not be able to search for movies without a title', () => {
			cy.get('[type="submit"]')
				.type(`{enter}`)

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

			cy.get('.movie-list-item')
				.first()
				.find('[data-imdb-id]')
				.then(($id) => {
					const dataImdbId = $id.attr('data-imdb-id')

					cy.get(':nth-child(1) > .card > .card-body > .card-link')
					.click()

					cy.url().should('include', dataImdbId)
				})
		})
	})

	context.skip('unhappy path', () => {

		beforeEach(() => {
			cy.visit('/')
		})

		it('should search for "Isaks Memes" and expect not to get any hits', () => {
			cy.get('.form-control')
				.type(`Isaks Memes{enter}`)

			cy.get('.alert')
				.should('be.visible')
				.contains('Movie not found!')

			cy.get(':nth.child').should('not.exist')
		})

		it('should search for "the postman always rings twice" and expect the request to make a timeout', () => {
			cy.get('.form-control')
				.type(`the postman always rings twice{enter}`)

			cy.get('.alert')
				.should('be.visible')

			cy.get('.alert-heading')
				.contains('👀')

			cy.get('p')
				.contains('Does he, really?')
		})

		it('should show an error message when entering the url for the movie with id "tt1337"', () => {
			cy.visit('/movies/tt1337')

			cy.get('.alert')
				.should('be.visible')

			cy.get('.alert-heading')
				.contains('LOL, what a fail')

			cy.get('p')
				.contains('Haxx0r now, are we?')
		})

		it('should show an error message when entering a page that does not exist', () => {
			cy.visit('/series')

			cy.get('.alert')
				.should('be.visible')

			cy.get('.alert-heading')
				.contains("It's not us, it's you")

			cy.get('p')
				.contains('That page does not exist. You should be ashamed of yourself.')
		})
	})

	context.only('mocked path for all The Matrix movies', () => {
		beforeEach(() => {

			cy.intercept('GET', 'https://mostly-mundane-movies.netlify.app/?q=The+Matrix', {
				fixture: 'movies.json',
			})

			cy.visit('/')
		})

		it('should be able to search for The Matrix and see the mocked The Matrix movies', () => {
			cy.get('.form-control')
				.type(`The Matrix{enter}`)

			cy.get(':nth-child(10)')
				.should('exist')

			cy.get('.py-3')
				.find(':nth-child(10)')
				.should('exist')
		})
	})

	context('mocked path for the movie "The Matrix"', () => {
		beforeEach(() => {

			cy.intercept('GET', 'https://mostly-mundane-movies.netlify.app/movies/tt0133093', {
				fixture: 'movie.json',
			})

			cy.visit('/')
		})

		it('should be able to see the mocked movie "The Matrix"', () => {
			cy.get('.card-title')
				.contains('The Matrix')
		})
	})
})
