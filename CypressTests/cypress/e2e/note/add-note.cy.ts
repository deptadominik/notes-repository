import '../../support/commands'
import {loginPage} from '../../pages/loginPage'
import {saveNoteModal} from '../../modals/saveNoteModal'
import {toastModal} from '../../modals/toastModal'

const noteContent:string = "#Test note content"
const username:string = "add@note.com"
const password:string = "Admin123!"

describe('User is able to add a note with default title to default directory', () => {
  before(() =>
    cy.createEmptyAccount(username, password)
  )

  beforeEach(() => {
    cy.visit('/Identity/Account/Login')
    loginPage.login(username, password)
    cy.visit('/editNote/newNote')
  })

  it('displays the content input and `save` button', () => {
    cy.dataRef('note-input').should('be.visible')
    cy.dataRef('save-note').should('be.visible')
  })

  it('is possible to add a note with default title, directory and emoji', () => {
    cy.dataRef('note-input').type(noteContent)
    cy.dataRef('save-note').click()
    cy.get('#noteTitle').should('have.value', 'New note')
    cy.xpath(saveNoteModal.directoryOption).first().should('have.value', 'Default')
    cy.xpath(saveNoteModal.saveButton).click()
    cy.xpath(toastModal.message, { timeout: 10000 })
      .should("have.text", "The note was saved.")
    cy.xpath(toastModal.closeButton).click()
  })
})

describe('User is not able to add a note with empty content', () => {
  beforeEach(() => {
    cy.visit('/Identity/Account/Login')
    loginPage.login(username, password)
    cy.visit('/editNote/newNote')
  })

  it('is not possible to add a note with empty content', () => {
    cy.dataRef('save-note').click()
    cy.xpath(toastModal.message, { timeout: 10000 })
      .should("have.text", "Your note is empty.")
  })
})

describe('User is not able to add a note without title', () => {
  beforeEach(() => {
    cy.visit('/Identity/Account/Login')
    loginPage.login(username, password)
    cy.visit('/editNote/newNote')
  })

  it('is not possible to add a note without title', () => {
    cy.dataRef('note-input').type(noteContent)
    cy.dataRef('save-note').click()
    cy.get('#noteTitle').clear()
    cy.xpath(saveNoteModal.saveButton).click()
    cy.xpath('//*[@class="validation-message"]')
      .should("have.text", "Required field!")
  })
})

describe('User is not able to add a note with a title, which has 1 character', () => {
  beforeEach(() => {
    cy.visit('/Identity/Account/Login')
    loginPage.login(username, password)
    cy.visit('/editNote/newNote')
  })

  it('is not possible to add a note with title, which has only 1 character', () => {
    cy.dataRef('note-input').type(noteContent)
    cy.dataRef('save-note').click()
    cy.get('#noteTitle').clear().type('t{enter}')
    cy.xpath('//*[@class="validation-message"]')
      .should("have.text", "Too short!")
  })

  after(() => {
    cy.deleteAccount(username)
  })
})
