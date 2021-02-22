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

    // Test the engage link
    it('Test Burger Menu Contains The Engage Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('engage')
    })

    // Test the faq link
    it('Test Burger Menu Contains The FAQ Page Link', () => {
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.contains('faq')
    })
})

describe ('Test The Burger Menu Links Work', () => {
    // Test the login link
    it('Test Burger Menu Login Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(2) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','/login')
    })

    // Test the register link
    it('Test Burger Menu Register Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(3) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','/register')
    })

    // Test the shop link
    it('Test Burger Menu Shop Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(4) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','')
    })

    // Test the about link
    it('Test Burger Menu About Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(5) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','about')
    })

    // Test the engage link
    it('Test Burger Menu Engage Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(6) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','engage')
    })

    // Test the faq link
    it('Test Burger Menu FAQ Link Works', () => {
        cy.visit('/')
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('.Menustyle__MenuList-xn7u6c-1 > :nth-child(7) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include','faq')
    })
})