describe ('Test The Burger Menu', () => {

    // Test the login link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('login')
    })

    // Test the register link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('register')
    })

    // Test the shop link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('shop')
    })

    // Test the about link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('about')
    })

    // Test the engage link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('engage')
    })

    // Test the faq link
    it('Test Contains The login page link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('faq')
    })
})