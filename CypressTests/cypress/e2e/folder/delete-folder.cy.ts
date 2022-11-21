import '../../support/commands'
import { loginPage } from '../../pages/loginPage'
import { toastModal } from '../../modals/toastModal'
import { navBar } from '../../modals/navBar'
import { editDirModal } from '../../modals/editDirModal'
import { addNewDirModal } from '../../modals/addNewDirModal'

const username: string = "delete@folder.com"
const password: string = "Admin123!"

describe('User is able to delete directory', () => {
    before(() =>
        cy.createAccountWithNote(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.openDirectoryMenu("Custom")
        editDirModal.deleteFolder()
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Directory has been deleted"
        );
    })
    it('directory is no more visible in navigation bar', () => {
        navBar.clickFolders()
        cy.dataRef("dir-Custom").should('not.exist')
    })
})

describe('User is not able to delete default directory', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.openDirectoryMenu("Default")
        editDirModal.deleteFolder()
        editDirModal.closeModal()
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "This folder can't be deleted!"
        );
    })
    it('default directory is still visible in navigation bar', () => {
        navBar.clickFolders()
        cy.dataRef("dir-Default").should('exist')
    })
    after(() => {
        cy.deleteAccount(username)
    })
})

describe('User is able to delete subdirectory', () => {
    before(() =>
        cy.createAccountWithNote(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.addNewSubdirectory("Custom")
        addNewDirModal.insertDirectoryName("Subdir")
        cy.xpath(toastModal.closeButton).click()
        navBar.clickOnFolder("Custom")
        navBar.openDirectoryMenu("Subdir")
        editDirModal.deleteFolder()
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Directory has been deleted"
        );
    })
    it('directory is no more visible in navigation bar', () => {
        navBar.clickFolders()
        navBar.clickOnFolder("Custom")
        cy.dataRef("dir-Subdir").should('not.exist')
    })
    after(() => {
        cy.deleteAccount(username)
    })
})