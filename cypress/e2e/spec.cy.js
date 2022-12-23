describe('Cypress Docker tests', () => {
  before('login to SWAG Labs', () => {
    cy.visit('/')
    cy.get('[data-test=username]')
      .type('standard_user')
    cy.get('[data-test=password]')
      .type('secret_sauce', {log: false})
    cy.get('form').submit()

    cy.get('.title').should('have.text','Products')
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('session-username')
})
  
  it('adds products', () => {
    cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click()
    cy.get('.shopping_cart_badge').should('have.text','1')
 
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test=checkout]').click()
    cy.get('[data-test=firstName]').type('Sam')
    cy.get('[data-test=lastName]').type('Nash')
    cy.get('[data-test=postalCode]').type(1234)
    cy.get('[data-test=continue]').click()
  })
  it('Submits the order', () => {
    cy.get('.inventory_item_name').should('have.text','Sauce Labs Bike Light')
    cy.get('.cart_quantity').should('have.text','1')
    cy.get('.summary_subtotal_label').should('have.text','Item total: $9.99')
    cy.get('[data-test=finish]').click()
    cy.get('.complete-header').should('have.text','THANK YOU FOR YOUR ORDER')
  })
})