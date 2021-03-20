describe ('The GDPR Page',() => {
    it ('Successfully loads', () => {
        cy.visit('/gdpr')
    })

    it ('Text displayed correctly', () => {
        cy.visit('/gdpr')
        cy.get('h1').contains('GDPR')
    })
})
