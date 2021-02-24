describe ('The Login Page',() => {
    const email = "user@test.com"

    it ('The login page loads successfully', () => {
        cy.visit('/login')
    })

    it('Does not login with incorrect credentials', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
        // should be on the same page after unsucessful login
        cy.url().should('include', '/login')
    })

    it('Displays error on incorrect login', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type('123456')
        cy.get('button').click()
        cy.url().should('include', '/login')
        cy.contains('Identifier or password invalid.')
    })

    it('Does not login when password is not provided', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('button').click()
        cy.url().should('include', '/login')
        cy.contains('Please provide your password.')
    })

    it('Logins with correct credentials', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        // should be redirected to dashboard
        cy.url().should('include', '/')
    })

    it('Welcome Message displayed correctly', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get('span').contains('Hey Another!')
    })

})

describe ('The Login Form looks OK',() => {
    //check form displayed correctly
    it('All text labels shown', () => {
        cy.visit('/login')
        cy.contains('Email Address *')
        cy.contains('Password *')
    })

    it ('Login Button shows the right text', () => {
        cy.visit('/login')
        cy.get('button').should('contain','LOGIN')
    })
})
