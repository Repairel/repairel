describe("Testing the hamburger menu links", function(){
    it("Clicks the hamburger menu",function(){
        
        // Visit the page
        cy.visit("http://localhost:3000")

        // Click burger menu
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()

        // Check it contains the links
        cy.contains('shop')
        cy.contains('about')
        cy.contains('faq')

        // Test Shop goes back home 
        cy.visit("http://localhost:3000")
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(4) > .global__StyledLink-sc-15fomil-2').click()
        cy.url().should('include', '') 
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()

        // Test About goes to about page 
        cy.visit("http://localhost:3000")
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(5) > .global__StyledLink-sc-15fomil-2').click().url().should('include', 'about')

        // Test FAQ goes to FAQ page 
        cy.visit("http://localhost:3000")
        cy.get('div[style="z-index:2;cursor:pointer"] > div').click()
        cy.get(':nth-child(6) > .global__StyledLink-sc-15fomil-2').click().url().should('include', 'faq') 
    })
})