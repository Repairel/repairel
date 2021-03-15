describe ('The Product sustainability explanation',() => {
    it ('The explanation is displayed', () => {
        cy.visit('/product/1')
        cy.contains('Design')
        cy.contains('Raw Materials')
        cy.contains('Material Manufacturing')
        cy.contains('Footwear Manufacturing')
        cy.contains('Retail')
        cy.contains('Use')
        cy.contains('Disposal')
    })
})
