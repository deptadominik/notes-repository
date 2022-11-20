export class loginPage {
    static login(username: string, password: string) {
        cy.dataRef('username').type(username)
        cy.dataRef('password').type(password)
        cy.dataRef('login').click()
    }
}
