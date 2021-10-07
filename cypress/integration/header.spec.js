describe('renders the header', () => {
    it('it should renders the logo correctly', () => {
        cy.visit('/')
        cy.get("#logo").should("exist")
    })
})