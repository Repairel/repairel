describe ('The Stock Counter',() => {
    it ('If the product is in stock then the text showing how much stock is there is shown',() => {
        cy.visit('/product/1')
        cy.get('button').then(($btn) => {
            if ($btn.hasClass('active')){
                if($btn.contains('ADD TO CART')){
                    cy.contains('currently in stock')
                }
            }
        })
    })

    it ('If the product is not in stock then the text asking the user to submit a product request is shown',() => {
        cy.visit('/product/2')
        cy.get('button').then(($btn) => {
            if($btn.hasClass('active')){
                if($btn.contains('ADD TO CART')){
                    cy.contains('currently in stock')
                }
                else{
                    cy.contains('Fill in this form and be the first to know when we have stock here')
                }
            }
        })
    })
})