describe ('Test The Engage Page Loads Correctly', () => {
    it('Test The Engage Page Includes Image', () => {
        cy.visit('/engage')
        cy.get('#__next').find('img').should('be.visible');
    })

    it('Test The Engage Page Includes Text', () => {
        cy.get('p > span').should('exist');
    })

    it('Test The Engage Page Has The Donate Button',() => {
        cy.get('.Productstyle__Wishlist-sc-1l4hg6u-5').should('exist')
    })

    it('Test The Engage Page Donate Button Goes To The Just Giving Page',() => {
        cy.get('.Productstyle__Wishlist-sc-1l4hg6u-5').click()
        cy.url().should('include','justgiving')
    })
})