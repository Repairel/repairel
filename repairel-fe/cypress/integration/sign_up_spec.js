describe ('The Registration Page',() => {

    it ('Successfully loads', () => {
        cy.visit('/register')
    })

    it('Form successfully submitted', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Bob')
        cy.get('input[name=surname]').type('Alice') 
        cy.get('input[name=email]').type('user@test.com')
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
    })

    it('User not created if email already exists', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Another')
        cy.get('input[name=surname]').type('Test') 
        cy.get('input[name=email]').type('user@test.com')
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        cy.url().should('include', '/register')
    })

    it('Error message shown when email address already exists', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Another')
        cy.get('input[name=surname]').type('Test') 
        cy.get('input[name=email]').type('user@test.com')
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        cy.contains('Email is already taken.')
    })

    it('Form not submitted when required info missing', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Bob')
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        cy.url().should('include', '/register')
    })

    it('Error message displayed when email address is not provided', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Bob')
        cy.get('input[name=surname]').type('Alice')
        cy.get('input[name=password]').type('1234')
        cy.get('button').click()
        cy.url().should('include', '/register')
        cy.contains('Please provide your email.')
    })

    it('Error message displayed when First Name is not provided', () => {
        cy.visit('/register')
        cy.get('input[name=surname]').type('Alice')
        cy.get('input[name=password]').type('1234')
        cy.get('input[name=email]').type('user@test.com')
        cy.get('button').click()
        cy.url().should('include', '/register')
        cy.contains('Please provide your first name.')
    })

    it('Error message displayed when Surname is not provided', () => {
        cy.visit('/register')
        cy.get('input[name=forename]').type('Bob')
        cy.get('input[name=password]').type('1234')
        cy.get('input[name=email]').type('user@test.com')
        cy.get('button').click()
        cy.url().should('include', '/register')
        cy.contains('Please provide your surname.')
    })

})

describe ('Registration Form Looks OK',() => {
    //check form displayed correctly
    it('All text labels shown', () => {
        cy.visit('/register')
        cy.contains('First Name *')
        cy.contains('Surname *')
        cy.contains('Email Address *')
        cy.contains('Password *')
    })

    it ('Register Button shown', () => {
        cy.visit('/register')
        cy.get('button').should('contain','REGISTER')
    })
})