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
        cy.contains('New').click()
        cy.contains("White Nike Shoes")
        cy.get('button').contains('Clear all').click()
    })

    it ('The Size filter works as expected', () => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.get('button').contains('Clear all').click()
        cy.contains('7').click()
        cy.contains('Blue Nikes')
        cy.should('not.contain.text','White Nike Shoes')
        cy.get('button').contains('Clear all').click()
    })

    it ('The Brand filter works as expected', () => {
        cy.visit('/')
        cy.contains('Filter').click({force: true})
        cy.get('button').contains('Clear all').click()
        cy.contains('Nike').click()
        cy.contains('Blue Nikes')
        cy.should('not.contain.text','Timberland Boots')
        cy.get('button').contains('Clear all').click()
    })
})