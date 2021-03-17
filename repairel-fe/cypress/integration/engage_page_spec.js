describe ('Test The Engage Page Loads Correctly', () => {

    it('Test The Engage Page Includes Text', () => {
        cy.visit('/engage')
        cy.get('[style="margin:1rem;display:flex;flex-direction:column"] > span').should('be.visible');
    })
})
