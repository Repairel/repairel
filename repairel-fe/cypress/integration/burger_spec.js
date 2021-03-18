describe ('Test The Burger Menu Contains The Correct Links', () => {

    // Test the login link
    it('Test Burger Menu Contains The Login Page Link', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('login')
    })

    // Test the register link
    it('Test Burger Menu Contains The Register Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('register')
    })

    // Test the shop link
    it('Test Burger Menu Contains The Shop Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('shop')
    })

    // Test the about link
    it('Test Burger Menu Contains The About Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('about')
    })

    // Test the faq link
    it('Test Burger Menu Contains The FAQ Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('faq')
    })

    // Test the method link
    it('Test Burger Menu Contains The Method Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('method')
    })
})

describe ('Test The Burger Menu Links Work', () => {
    // Test the login link
    it('Test Burger Menu Login Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(2) > .global__StyledLink-sc-15fomil-3').click()
        cy.url().should('include','/login')
    })

    // Test the register link
    it('Test Burger Menu Register Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(3) > .global__StyledLink-sc-15fomil-3').click()
        cy.url().should('include','/register')
    })

    // Test the shop link
    it('Test Burger Menu Shop Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(4) > .global__StyledLink-sc-15fomil-3').click()
        cy.url().should('include','')
    })

    // Test the about link
    it('Test Burger Menu About Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(5) > .global__StyledLink-sc-15fomil-3').click()
        cy.url().should('include','about')
    })

    // Test the faq link
    it('Test Burger Menu FAQ Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(6) > .global__StyledLink-sc-15fomil-3').click()
        cy.url().should('include','faq')
    })

    // Test the engage link
    it('Test Burger Menu Method Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(7) > .global__StyledLink-sc-15fomil-3').click()
        // URL for method page is ../scoring
        cy.url().should('include','scoring')
    })
})
