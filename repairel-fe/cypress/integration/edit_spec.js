describe ('The Edit Details Page',() => {

    it ('Successfully loads', () => {
        cy.visit('/edit')
    })

    it ('Redirected to login page if user not logged in', () => {
        cy.visit('/edit')
        cy.url().should('include','/')
    })
})
