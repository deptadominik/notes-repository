import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { saveNoteModal } from "../../modals/saveNoteModal";
import { toastModal } from "../../modals/toastModal";

const username: string = "edit@note.com";
const password: string = "Admin123!";
const originalNoteTitle: string = "Password list";
const newNoteTitle: string = "Custom title";
const newNoteContent: string = "New note content";

describe("User is able to see when the note was last edited at", () => {
  before(() => cy.createAccountWithNote(username, password));

  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("displays the correct date & time on edit note page", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(originalNoteTitle);
    cy.xpath('//h6[contains(text(), "Last edited Date")]')
      .invoke("text")
      .should("contain", "04/21/2021 09:42:00");
  });
});

describe("User is able to edit note title", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(originalNoteTitle);
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.noteTitle).clear().type(newNoteTitle);
    cy.xpath(saveNoteModal.saveButton).click();
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The note has been overwritten."
    );
  });

  it("new title is visible on edit note page", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(newNoteTitle);
    cy.dataRef("note-title").should("contain.text", newNoteTitle);
  });
});

describe("User is able to edit note content", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(newNoteTitle);
    cy.dataRef("note-input").clear().type(newNoteContent);
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.saveButton).click();
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The note has been overwritten."
    );
  });

  it("new content is visible on edit note page", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(newNoteTitle);
    cy.dataRef("note-input").should("have.value", newNoteContent);
  });
});

describe("User is able to edit note icon", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(newNoteTitle);
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.noteIconSelect).select("💻");
    cy.xpath(saveNoteModal.saveButton).click();
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The note has been overwritten."
    );
  });

  it("new icon is visible on edit note page", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(newNoteTitle);
    cy.dataRef("note-title").should("contain.text", "💻");
  });

  after(() => cy.deleteAccount(username));
});
