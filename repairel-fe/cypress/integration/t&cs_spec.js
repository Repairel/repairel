describe ('Test The Engage Page Loads Correctly', () => {

    // Check that the repairelhub logo is therer
    it('Test The T&Cs Page Includes Image', () => {
        cy.visit('/T&Cs')
        cy.get('center').find('img').should('be.visible');
    })

    // Check that the title is there
    it('Test The T&Cs Page Includes The Title',() => {
        cy.get('.global__LinedHeading-sc-15fomil-1').should('exist')
    })

    // Check that there is text in the correct section. .* is regex and matches any character 
    it('Test The T&Cs Page Includes Text', () => {
        cy.contains('section > span', /.*/)
    })

})
