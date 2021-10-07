describe('renders the homePage', () => {
    it('it should renders correctly', () => {
        cy.visit('/')
        cy.get("#header").should("exist")
        cy.get("#table").should("exist")
    })
})