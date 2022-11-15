Cypress.Commands.add('dataRef', (value) => {
  cy.get(`[data-ref=${value}]`)
})
Cypress.Commands.add('createEmptyAccount', (email, password) => {
  cy.request('POST', '/api/accounts/empty', { email: email, password: password })
})

Cypress.Commands.add('deleteAccount', (email) => {
  cy.request('DELETE', '/api/accounts/delete-by-email/', { email: email })
})