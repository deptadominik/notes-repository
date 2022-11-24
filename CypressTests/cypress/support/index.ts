declare namespace Cypress {
    interface Chainable {
        dataRef(value: string): Chainable<Element>
        createEmptyAccount(email: string, password: string): void
        createAccountWithNote(email: string, password: string): void
        createAccountWithManyNotes(email: string, password: string): void
        createAccountWithSubdirectory(email: string, password: string): void
        deleteAccount(email: string): void
    }
}
