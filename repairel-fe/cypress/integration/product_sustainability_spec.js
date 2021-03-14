describe ('The Product sustainability explanation',() => {
    it ('The explanation is displayed', () => {
        cy.visit('/product/1')
        cy.contains('DESIGN')
        cy.contains('RAW MATERIALS')
        cy.contains('MATERIAL MANUFACTURING')
        cy.contains('FOOTWEAR MANUFACTURING')
        cy.contains('USE')
        cy.contains('DISPOSAL')
    })
})