describe ('The Product Scoring Categories',() => {

    it ('The new category is shown', () => {
        cy.visit('/product/1')
        cy.get('p').contains('material manufacturing')
    })
})
