describe ('The Cookie Pop-up feature',() => {

    it ('The Cookie popup is displayed',() => {
        cy.visit('/')
        cy.contains('REPAIREL uses cookies to improve user experience. Find out more about our privacy policy.') 
    })

    it ("The I understand button makes the popup disappear when clicked",() => {
        cy.visit('/')
        cy.get('button').contains('I understand').click()
        cy.contains('I understand').should('not.exist')
    })

    it ("The I understand button is shown",() => {
        cy.visit('/')
        cy.contains('I understand')
    })
    
    it ("The GDPR link takes to the right page",() => {
        cy.visit('/')
        cy.contains('Find out more about our privacy policy.').click()
        cy.url().should('include','/gdpr')
    })

})