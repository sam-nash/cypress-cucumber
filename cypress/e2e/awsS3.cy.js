
it("Test AWS", async() => {//this is cypress code
    cy.task('run').then((data) => {
        cy.log(JSON.stringify(data.Contents))
    })
})