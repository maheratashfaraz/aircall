describe('renders the table', () => {
    it('it should renders the table header correctly', () => {
        cy.visit('/')
        cy.get("#table-header").should("exist")
        cy.get("#table-header")
        cy.get('#table') // table

        cy.contains('Number')
        cy.contains('Direction')
        cy.contains('Date')
    })
})