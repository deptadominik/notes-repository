import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { saveNoteModal } from "../../modals/saveNoteModal";
import { toastModal } from "../../modals/toastModal";

const username: string = "operateOn@note.com";
const password: string = "Admin123!";
const originalNoteTitle: string = "Password list";

describe("User is able to restore a note from bin to directory", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Custom")
    navBar.clickOnNoteMenu(originalNoteTitle)
    navBar.deleteNote()
    cy.xpath(toastModal.closeButton).click()
    navBar.clickTrash()
    navBar.clickOnFolder("Custom")
    navBar.clickOnNoteMenuByTitle(originalNoteTitle)
    cy.xpath(saveNoteModal.noteIconBinSelect).select("Default");
    cy.xpath(saveNoteModal.saveButton).click()
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The note has been restored."
    );
  });
  it("note is restored to correct directory", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Default")
    navBar.assertNoteTitle(originalNoteTitle, "Password")
  });
  after(() => {
    cy.deleteAccount(username)
  })
});

describe("User is able to delete a note permanently from bin", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Custom")
    navBar.clickOnNoteMenu(originalNoteTitle)
    navBar.deleteNote()
    cy.xpath(toastModal.closeButton).click()
    navBar.clickTrash()
    navBar.clickOnNoteMenuByTitle(originalNoteTitle)
    cy.xpath("//div[text()='Delete Note Permanently']").click();
    cy.xpath(saveNoteModal.closeButton).click()
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The note has been removed."
    );
  });
  it("note is no more visible in trash", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Custom")
    cy.dataRef(`'note-${originalNoteTitle}'`).should("not.exist")
  });
  after(() => {
    cy.deleteAccount(username)
  })
});