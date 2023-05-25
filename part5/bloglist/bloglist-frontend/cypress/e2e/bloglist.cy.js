describe('Blog list app', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('log in')
  })
  // it('front page contains random text', function() {
  //   cy.visit('http://localhost:3000')
  //   cy.contains('wtf is this app?')
  // })
})