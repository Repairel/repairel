describe ('Test The Sustainability Explanation Page',() => {

    it ('Successfully loads', () => {
        cy.visit('/scoring')
    })

    it ('Method Lined Title Loads Correctly', () =>{
        cy.get('.global__LinedHeading-sc-15fomil-1').should('exist')
    })

    it ('Method Explanation Loads Correctly', () =>{
        cy.get('main > span').should('exist')
    })

    it ('Method Explanation Loads Correctly', () =>{
        cy.get('main > span').should('exist')
    })

    it ('Scores Lined Title Loads Correctly', () =>{
        cy.get('main > :nth-child(3)').should('exist')
    })

    it ('Excellent Graphic Loads Correctly', () =>{
        cy.get('main > :nth-child(4) > :nth-child(1)').should('exist')
    })

    it ('Very Good Graphic Loads Correctly', () =>{
        cy.get('main > :nth-child(4) > :nth-child(2)').should('exist')
    })

    it ('Good Graphic Loads Correctly', () =>{
        cy.get('main > :nth-child(4) > :nth-child(3)').should('exist')
    })

    it ('Satisfactory Graphic Loads Correctly', () =>{
        cy.get('main > :nth-child(4) > :nth-child(4)').should('exist')
    })

    it ('Unsatisfactory Graphic Loads Correctly', () =>{
        cy.get('main > :nth-child(4) > :nth-child(5)').should('exist')
    })

    it ('Criteria Lined Heading Loads Correctly', () =>{
        cy.get('main > :nth-child(5)').should('exist')
    })

    it ('Material Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(1)').should('exist')
    })

    it ('Material Processnig Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(2)').should('exist')
    })

    it ('Manufacturing Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(3)').should('exist')
    })

    it ('Assembly Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(4)').should('exist')
    })

    it ('Use Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(5)').should('exist')
    })

    it ('Disposal Explanation Loads Correctly', () =>{
        cy.get('main > :nth-child(6) > :nth-child(6)').should('exist')
    })
})
