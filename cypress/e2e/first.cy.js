describe('Schema validation Tests', () => {
before('Reads Test Data', () => {
    cy.generateFixture()
})
    const testdata = require('../fixtures/testData.json')
   // const expectedData = ['$1,763.00', '$1,554.18', '$1,132.13', '$2,126.17','$2,860.61','$2,105.95']
    testdata.hits.forEach((data) => {
    it(`${data.objectID}`, () => {
        cy.log(JSON.stringify(data))
        //use this payload a body for REST API POST call later
        cy.log(data.objectID)        
      //cy.wrap(data.message.balance).should('be.oneOf', expectedData)
    })
  })
})