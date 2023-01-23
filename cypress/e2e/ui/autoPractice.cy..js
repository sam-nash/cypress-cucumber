import HomePage from '../../pages/HomePage'
import HelperClass from '../../pages/HelperClass'
const homePage = new HomePage() 

describe('End to End Tests for a Workflow', () => {
   
it('Step 1 : Verify that the category for Summer Dresses exists and then click on the menu', () => {
    cy.visit('/')
    homePage.getSummerDressesMenuOption()
            .should('have.text','Summer Dresses')
            .click({force:true})
    homePage.getHeader()     //verifies the page heading
            .should('contain','Summer Dresses')                 
})
it('Click on All specials button', () => {
    homePage.getAllSpecials()
            .should('contain', 'All specials')
            .then(() => {
                homePage.getAllSpecials()
                        .click({force:true})
            })
    //verifies the page heading
    cy.get('h1.page-heading').should('contain', 'Price drop')
})

it('Verify the number of products', () => {
    cy.get('ul.product_list')
      .find('li.ajax_block_product')
      .should('have.length', 2)
})

it('Sort products by Z-A', () => {
    let sortOption = 'Product Name: Z to A'
    homePage.getSortProduct()
            .select(sortOption)
            .should('contain.text', sortOption)
    //assert products are sorted        
})


it('Verify the first product, choose qty, size, color and adds product to cart', () => {
    //declare product attribuites object - can be externalised in a fixtures file too

    // let productName = 'Printed Summer Dress'
    let productOptions = {
        name : 'Printed Summer Dress',
        quamtity : 2,
        size : 'M',
        color : 'Blue'
    }
    
    //Cliks on More button based on the product name
    homePage.getProductMoreButton(productOptions.name).click()

    //selects product quantity, size, color
    cy.get('#quantity_wanted').clear().type('2')
    cy.get('select').select('M')
    cy.get('#color_to_pick_list > li > [name="Blue"]').click()

    //Adds to cart & verifies the pop up is displayed
    cy.get('.exclusive > span').contains('Add to cart').click()
    cy.get('.layer_cart_product').should('be.visible')

    //Verifies that the product cart pop up contains the text - product added and then clicks on the Proceed to checkout
    cy.get('.layer_cart_product > h2')
      .should('contain.text','Product successfully added to your shopping cart')
      .then(() => {
        cy.contains('Proceed to checkout').click({force:true})
      })
    
    //Verifies Product Name Color and Size
    cy.get('tbody > tr > td.cart_description')
      .contains(productOptions.name)
      .parent()
      .siblings().eq(1)
      .should('have.text','Color : '+productOptions.color+', Size : '+productOptions.size)

    //Takes a screenshot of the cart
    cy.screenshot()

    //Proceed to checkout : verifies the button text and clicks on it
    cy.get('.standard-checkout')
      .should('contain.text','Proceed to checkout')
      .click()
    })

})
