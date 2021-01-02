
describe ('The FAQs Page',() => {
    it ('Successfully loads', () => {
        cy.visit('/faq')
    })

    it ('Text displayed correctly', () => {
        cy.visit('/faq')
        cy.get('h1').contains('FAQs')
    })
})

describe ('The About Page',() => { 
    it ('Successfully loads', () => {
        cy.visit('/about')
    })

    it ('Text displayed correctly', () => {
        cy.visit('/about')
        cy.get('h1').contains('About us')
    })
}) 