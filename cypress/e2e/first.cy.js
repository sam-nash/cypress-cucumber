// let testData
// const file = './cypress/e2e/apiTests/testData.json'
// before('Reads Test Data', () => {
//     cy.readFile(file).then((data) => {
//       testData = data        
//     })
//     // cy.wrap(testData).as('testData')
// })
describe('Schema validation Tests', () => {
    // We cannot load JSON file using "cy.fixture"
    // because it means the test is already running.
    // Same with using "before" hook - new tests cannot be created from "before" hook.
    // Instead we need to load JSON file using "require" at the start time
    // and generate tests.
    const testdata = require('../../fixtures/testData.json')
    const expectedData = ['$1,763.00', '$1,554.18', '$1,132.13', '$2,126.17','$2,860.61','$2,105.95']
    testdata.forEach((data) => {
    it(`${data.guid}`, () => {
        cy.log(JSON.stringify(data))
        cy.log(data.uuid)        
      cy.wrap(data.message.balance).should('be.oneOf', expectedData)
    })
  })
})

//Test reads data from a file & inidividually references each data in a separate it block
// it('Test Data ${testData}', () => {
//     cy.log(testData[0].TestCase)
//     cy.log(testData[0].guid)
// })
// it('Test Data :', () => {
//     cy.log(testData[1].TestCase)
//     cy.log(testData[1].guid)
// })
// it('Test Data :', () => {
//     cy.log(testData[2].TestCase)
//     cy.log(testData[2].guid)
// })

// Test reads from fixture and loops through each data
// it('Tests', () => {
//     cy
//     .fixture('testData')
//     .then((list) => {
//       list.forEach((item, i) => {
//         cy.log(item.TestCase)
//         cy.log(item.balance)
//         })
//     })
// })
