import '../../support/commands'
import { loginPage } from '../../pages/loginPage'
import { navBar } from '../../modals/navBar'

const username: string = "add@template.com"
const password: string = "Admin123!"
const todoTemplateValue: string = `## ToDo List

---
Things that I need to do this weekend:
* ~~do grocery shopping~~
* \`pay the bills\`
* clean up the garage
    * wash the car
    * wash the bike`

const todoTemplateWithTableValue: string = `## ToDo List

---
Things that I need to do this weekend:

|  to do  | doing  |  done |
|----------|----------|---------|
| pay the bills  |  wash the car | do grocery shopping   |   
| wash the bike |  |  |`

describe('User is able to add a note using TODO template', () => {
    before(() =>
        cy.createEmptyAccount(username, password)
    )
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct template is applied', () => {
        navBar.clickTemplates()
        cy.xpath("//button[text()='Edit note']").click()
        cy.dataRef("note-input").should("have.value", todoTemplateValue)
    })
})

describe('User is able to add a note using TODO with table template', () => {
    beforeEach(() => {
        cy.visit('/Identity/Account/Login')
        loginPage.login(username, password)
    })
    it('correct template is applied', () => {
        navBar.clickTemplates()
        cy.xpath("//button[text()='To-do list with table']").click()
        cy.xpath("//button[text()='Edit note']").click()
        cy.dataRef("note-input").should("have.value", todoTemplateWithTableValue)
    })
    after(() => {
        cy.deleteAccount(username)
    })
})