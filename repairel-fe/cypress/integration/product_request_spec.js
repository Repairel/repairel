describe ('Test Product Request Page Loads',() => {
    it ('Test Product Request Page Loads Correctly', () => {
        cy.visit('/product_request')
    })
})

describe('Test Product Request Form Posts Information',() => {
    it('Correct Info Entered To Test POST Works', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://rocky-earth-77368.herokuapp.com/',
          }).as('postCheck')

        cy.visit('/product_request')
        cy.get('#Name').type("Alice")
        cy.get('#Email').type("alice@bobmail.com")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Size').type("5")
        cy.get('#Type').type("Shoes")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.contains('#OtherSpecifications')

        cy.wait('@postCheck').then((interception) => {
            assert.isNotNull(interception.response.body, 'POST has data')
          })

    })
})

describe('Test Product Request Form Works With Acceptable Input',() => {
    it('Correct Info Entered', () => {
        cy.visit('/product_request')
        cy.get('#Name').type("Alice")
        cy.get('#Email').type("alice@bobmail.com")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Size').type("5")
        cy.get('#Type').type("Shoes")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.contains('#OtherSpecifications')

    })
})

describe ('Test Product Request Form Stipulations Work',() => {
    it ('Test Product Request Requires Name', () => {
        cy.visit('/product_request')
        cy.get('#Email').type("alice@bobmail.com")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Size').type("5")
        cy.get('#Type').type("Shoes")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.should('not.contain','#OtherSpecifications')
    })

    it ('Test Product Request Requires Email', () => {
        cy.visit('/product_request')
        cy.get('#Name').type("Alice")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Size').type("5")
        cy.get('#Type').type("Shoes")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.should('not.contain','#OtherSpecifications')
    })

    it('Test Product Request Requires Size', () => {
        cy.visit('/product_request')
        cy.get('#Name').type("Alice")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Email').type("alice@bobmail.com")
        cy.get('#Type').type("Shoes")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.contains('#OtherSpecifications')

    })

    it('Test Product Request Requires Style', () => {
        cy.visit('/product_request')
        cy.get('#Name').type("Alice")
        cy.get(':nth-child(2) > .Brand').type("Alice in WonderBrand")
        cy.get('#Email').type("alice@bobmail.com")
        cy.get('#Size').type("5")
        cy.get('#OtherSpecifications').type("Good for running")
        cy.get('button').click()
        cy.contains('#OtherSpecifications')

    })
})
