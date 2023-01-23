//Purpose of this page is to have all common functions in 1 place

class HomePage {
   
    getSearchBar() {
      return cy.get('[name="search_query"]')
    }

    getSearchButton() {
      return cy.get('[name="submit_search"]')
    }
  
    getCategories(){
      return cy.get('#block_top_menu')
               .find('ul.sf-menu')
               .find('li > a')
    }

    getWomenMenu(){
      //return cy.get('#block_top_menu > ul.sf-menu > li:nth-child(1) > a')
      return this.getCategories().contains('a[title]','Women')
    }
    getDressesCategory(){
      return this.getWomenMenu()
                 .siblings('ul')
                 .contains('a[title]','Dresses')
    }
    getSummerDressesMenuOption(){
      return this.getDressesCategory()
                 .siblings('ul')
                 .contains('a[title]','Summer Dresses')
    }
    getAllSpecials(){
      return cy.get('a[title="All specials"]')
    }
    getHeader(){
      return cy.get('.cat-name')
    }
    getSortProduct(){
      return cy.get('select[id="selectProductSort"]')
    }
    //cy.get('.first-in-line > .product-container > .right-block > .button-container > .lnk_view > span')
    getProductDetails(){
      return cy.get('li.ajax_block_product > .product-container > .right-block')
    }
    getProductName(productName){
      return this.getProductDetails()
                 .find('h5 > .product-name')
                 .contains(productName)
    }
    getProductMoreButton(productName){
      return this.getProductName(productName)
                 .parents('.right-block')
                 .find('.button-container > .lnk_view > span')
                 .contains('More')
    }
  }
  export default HomePage
  