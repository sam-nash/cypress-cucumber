//Purpose of this page is to have all common functions in 1 place

class HelperClass {
    constructor(){
      this.searchQ = cy.get('gLFyf.gsfi');
    }
    
    getSearchButton() {
      return cy.get('[name="btn_Search"]')
    }
  
    getH1PageHeader() {
      return cy.get('h1')
    }
  
    getH2PageHeader() {
      return cy.get('h2')
    }
  
    getH3PageHeader() {
      return cy.get('h3')
    }
  
    getH4PageHeader() {
      return cy.get('h4')
    }
    getTableBody() {
      //access the table body on any page. For multiple tables on a page access using eq(index)
      return cy.get('table > tbody > tr')
    }
  
    //Verifies the label names on a page - specify the position as an integer, the custom message you want to print(ex: first element is) and the label text you want to verify
    assertLabelText(n, message, labelName) {
      cy.get('.cp_label').then(($lbl) => {
        expect($lbl.get(n).textContent.replace(/(\n|\t)/gm,""), message).to.equal(labelName)
      })
    }
  
  }
  export default HelperClass
  