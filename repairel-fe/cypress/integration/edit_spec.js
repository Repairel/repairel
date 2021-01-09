describe ('The Edit Details Page',() => {

    it ('Successfully loads', () => {
        cy.visit('/edit')
    })

    it ('Redirected to login page if user not logged in', () => {
        cy.visit('/edit')
        cy.url().should('include','/login')
    })
})

describe ('The Edit Form',() => {
    //check form displayed correctly
    it('All text labels shown', () => {
        cy.visit('/edit')
        cy.contains('First Name')
        cy.contains('Second Name')
        cy.contains('Phone Number')
        cy.contains('Email Address')
        cy.contains('Old Password *')
        cy.contains('New Password')
    })
})