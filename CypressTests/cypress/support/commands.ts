Cypress.Commands.add('dataRef', (value) => {
  cy.get(`[data-ref=${value}]`)
})

Cypress.Commands.add('createEmptyAccount', (email, password) => {
  cy.request('POST', '/api/accounts/empty', { email: email, password: password })
})

Cypress.Commands.add('createAccountWithNote', (email, password) => {
  cy.request('POST', '/api/accounts/with-note', { email: email, password: password })
})

Cypress.Commands.add('createAccountWithSubdirectory', (email, password) => {
  cy.request('POST', '/api/accounts/with-subdirectory', { email: email, password: password })
})

Cypress.Commands.add('deleteAccount', (email) => {
  cy.request('DELETE', '/api/accounts/delete-by-email/', { email: email })
})