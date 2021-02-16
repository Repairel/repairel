describe ('The Filter by brand feature',() => {

    it ('The Filter option is displayed',() => {
        cy.visit('/')
        cy.contains('Filter') 
    })

    it ('The filter button is clickable',() => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
    })

    it ('The dropdown menu is displayed',() => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.get('button').should('contain','Clear all')
    })

    it ('The dropdown displays correct fields',() => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.contains('Price')
        cy.contains('Condition')
        cy.contains('Size')
        cy.contains('Brand')
    })

    it ('The Condition filter works as expected', () => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.contains('Refurbished').click()
        cy.contains("We're sorry, there are no products that match these filters.")
    })

    it ('The Size filter works as expected', () => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.contains('7').click()
        cy.contains('shoe2')
        cy.should('not.contain.text','shoe1')
    })

    it ('The Brand filter works as expected', () => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.contains('Doc Martens').click()
        cy.contains('shoe1')
        cy.should('not.contain.text','shoe2')
    })
})