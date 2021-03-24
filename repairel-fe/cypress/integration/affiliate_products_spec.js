describe ('The Affiliate Product feature',() => {
    it ('Affiliate product has affiliate link button', () => {
        cy.visit('/product/1')
        cy.get('button').contains('I understand').click()
        cy.contains('shop this brand')
    })

    it ("Affiliate product doesn't contain ADD to Basket button", () => {
        cy.visit('/product/1')
        cy.get('a').should('not.contain.text','ADD TO CART')
    })
})
