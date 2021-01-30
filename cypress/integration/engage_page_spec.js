describe ('Test The Engage Page Loads Correctly', () => {
    it('Test The Engage Page Includes Image', () => {
        cy.visit('/engage')
        cy.get('[style="width:100%;height:auto"]').should('be.visible');
    })

    it('Test The Engage Page Includes Text', () => {
        cy.get('[style="margin:1rem;display:flex;flex-direction:column"] > span').should('be.visible');
    })
})