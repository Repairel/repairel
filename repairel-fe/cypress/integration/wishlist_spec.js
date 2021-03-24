describe ('The Wishlist Feature',() => {

    it ('Add to wishlist button is there', () => {
        cy.visit('/product/1')
        cy.contains('Add to wishlist')
    })
})
