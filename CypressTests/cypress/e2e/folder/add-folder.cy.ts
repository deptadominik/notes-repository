import '../../support/commands'
import { loginPage } from '../../pages/loginPage'
import { toastModal } from '../../modals/toastModal'
import { navBar } from '../../modals/navBar'
import { addNewDirModal } from '../../modals/addNewDirModal'

const username: string = "add@folder.com"
const password: string = "Admin123!"

describe('User is able to add a directory', () => {
    before(() =>
        cy.createEmptyAccount(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.addNewDirectory()
        addNewDirModal.insertDirectoryName("TestDir")
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Folder has been created."
        );
    })
    it('directory is visible in navigation bar', () => {
        navBar.clickFolders()
        cy.dataRef("dir-TestDir").should("contain.text", "TestDir")
    })
    after(() => {
        cy.deleteAccount(username)
    })
})

describe('User is able to add a subdirectory', () => {
    before(() =>
        cy.createEmptyAccount(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct notification is displayed', () => {
        navBar.clickFolders()
        navBar.addNewSubdirectory("Default")
        addNewDirModal.insertDirectoryName("TestSubdir")
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Folder has been created."
        );
    })
    it('subdirectory is visible in navigation bar', () => {
        navBar.clickFolders()
        navBar.clickOnFolder("Default")
        cy.dataRef("dir-TestSubdir").should("contain.text", "TestSubdir")
    })
})

describe('User is not able to add a directory without name', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct validation message is displayed', () => {
        navBar.clickFolders()
        navBar.addNewDirectory()
        addNewDirModal.insertDirectoryName(" ")
        addNewDirModal.getValidationMessage().should("have.text", "Required field!")
    })
})

describe('User is not able to add a directory with too short name', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct validation message is displayed', () => {
        navBar.clickFolders()
        navBar.addNewDirectory()
        addNewDirModal.insertDirectoryName("g")
        addNewDirModal.getValidationMessage().should("have.text", "Too short!")
    })
    after(() => {
        cy.deleteAccount(username)
    })
})