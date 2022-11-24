import '../../support/commands'
import { loginPage } from '../../pages/loginPage'
import { navBar } from '../../modals/navBar'
import { toastModal } from '../../modals/toastModal'

const username: string = "add@draft.com"
const password: string = "Admin123!"

describe('User is able to add a draft note', () => {
    before(() =>
        cy.createEmptyAccount(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
        cy.viewport(1920, 1080)
    })
    it('correct notification is displayed', () => {
        cy.dataRef("home-btn").click()
        cy.dataRef("draf-text-area").type("Draft content for testing")
        cy.xpath("//a[text()='Save']").click()
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "The note was saved."
        );
    })
    it('draft note is saved', () => {
        navBar.insertIntoSearchBarAndClickFirstResult("SavedFromDraft");
        cy.dataRef("note-title").should("contain.text", "SavedFromDraft");
        cy.dataRef("note-input").should("have.value", "Draft content for testing");
    })
})

describe('User is able to clear the draft note input', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
        cy.viewport(1920, 1080)
    })
    it('draft note input is cleared', () => {
        cy.dataRef("home-btn").click()
        cy.dataRef("draf-text-area").type("Draft content for testing")
        cy.xpath("//a[text()='Clear']").click()
        cy.dataRef("draf-text-area").should(
            "have.value",
            ""
        );
    })
    after(() => {
        cy.deleteAccount(username)
    })
})
