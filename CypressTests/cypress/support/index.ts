declare namespace Cypress {
    interface Chainable {
        dataRef(value: string): Chainable<Element>
        createEmptyAccount(email: string, password: string): void
        deleteAccount(email: string): void
    }
}
