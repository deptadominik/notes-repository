import '../../support/commands'
import { loginPage } from '../../pages/loginPage'
import { toastModal } from '../../modals/toastModal'
import { navBar } from '../../modals/navBar'
import { editDirModal } from '../../modals/editDirModal'
import { addNewDirModal } from '../../modals/addNewDirModal'

const username: string = "edit@folder.com"
const password: string = "Admin123!"

describe('User is able to edit a directory name', () => {
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
        editDirModal.insertNewFolderName("FreshName")
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "The directory name has been updated."
        );
    })
    it('new directory name is visible in navigation bar', () => {
        navBar.clickFolders()
        cy.dataRef("dir-FreshName").should("contain.text", "FreshName")
    })
})

describe('User is not able to edit name of the default directory', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.openDirectoryMenu("Default")
        editDirModal.insertNewFolderName("FreshName")
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "An error occurred while changing name of directory."
        );
    })
    after(() => {
        cy.deleteAccount(username)
    })
})

describe('User is able to move subdirectory to another directory', () => {
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
        editDirModal.selectNewFolder("Default")
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Folder directory has been updated."
        );
    })
    it('directory is visible under new directory in navigation bar', () => {
        navBar.clickFolders()
        navBar.clickOnFolder("Custom")
        cy.dataRef("dir-Subdir").should('not.exist')
        navBar.clickOnFolder("Default")
        cy.dataRef("dir-Subdir").should('be.visible')
    })
    after(() => {
        cy.deleteAccount(username)
    })
})