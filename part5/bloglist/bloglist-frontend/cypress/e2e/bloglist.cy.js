describe('Blog list app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Root User',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('log in')
  })

  it('login form is shown', function() {
    cy.contains('log in').click()
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.contains('log in').click()
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Root User is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      // cy.get('.fail').contains('wrong username or password')
      cy.get('.fail')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Root User is logged in')
    })

  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('log in').click()
      // cy.get('#username').type('root')
      // cy.get('#password').type('sekret')
      // cy.get('#login-button').click()
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('cypress')
      cy.get('#url').type('localhost')
      cy.get('#create').click()
      cy.contains('a new blog cypress')
    })

    describe('and when a blog exists', function() {
      beforeEach(function() {
        // cy.contains('create new blog').click()
        // cy.get('#title').type('a new blog')
        // cy.get('#author').type('cypress')
        // cy.get('#url').type('localhost')
        // cy.get('#create').click()
        cy.createBlog({
          title: 'a new blog',
          author: 'cypress',
          url: 'localhost'
        })
      })

      it('blog details can be viewed and hidden', function() {
        cy.contains('a new blog cypress').get('.url').should('not.exist')
        cy.contains('a new blog cypress').get('.likes').should('not.exist')
        cy.contains('a new blog cypress').contains('View').click()
        cy.contains('a new blog cypress').get('.url').should('exist')
        cy.contains('a new blog cypress').get('.likes').should('exist')
        cy.contains('a new blog cypress').contains('localhost')
        cy.contains('a new blog cypress').contains('likes 0')
        cy.contains('a new blog cypress').contains('Hide').click()
        cy.contains('a new blog cypress').get('.url').should('not.exist')
        cy.contains('a new blog cypress').get('.likes').should('not.exist')
      })

      it('blog can be liked', function() {
        cy.contains('a new blog cypress').contains('View').click()
        cy.contains('a new blog cypress').contains('likes 0')
        cy.contains('a new blog cypress').contains('Like').click()
        cy.contains('a new blog cypress').contains('likes 1')
      })

      it('the user who created a blog can delete it', function() {
        cy.contains('a new blog cypress').contains('View').click()
        cy.contains('a new blog cypress').contains('Remove Blog').click()
        cy.contains('a new blog cypress').should('not.exist')
      })

      it('only the creator can see the remove blog button', function() {
        const anotherUser = {
          name: 'Guest User',
          username: 'guest',
          password: 'sekret'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, anotherUser)
        cy.contains('a new blog cypress').should('exist')
        cy.contains('logout').click()
        cy.contains('log in').click()
        cy.get('#username').type('guest')
        cy.get('#password').type('sekret')
        cy.get('#login-button').click()
        cy.contains('Guest User is logged in')
        cy.contains('a new blog cypress').contains('View').click()
        cy.contains('a new blog cypress').contains('Remove Blog').should('not.exist')
      })
    })
  })

})