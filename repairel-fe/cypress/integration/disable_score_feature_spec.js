describe("Testing the removal of the score feature", function(){
    it("Check no rating on shop page",function(){
        cy.visit("http://localhost:3000")
        cy.get('ProductInfostyle__Rating-sc-2djmjb-3 feCNmP').should('not.exist')
    })
    
    it("Check no rating on product page",function(){
        cy.visit("http://localhost:3000")
        cy.get('.ProductListstyle__ProductImage-u9aoiu-1').click()
        cy.get('.ProductInfostyle__Rating-sc-2djmjb-3 feCNmP').should('not.exist')
    })
})
