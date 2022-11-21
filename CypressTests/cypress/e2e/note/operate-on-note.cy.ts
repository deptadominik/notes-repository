import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { saveNoteModal } from "../../modals/saveNoteModal";
import { toastModal } from "../../modals/toastModal";

const username: string = "operateOn@note.com";
const password: string = "Admin123!";
const originalNoteTitle: string = "Password list";

describe("User is able to pin a note", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("note is pinned on home page under `Pinned` section", () => {
    cy.visit('/editNote/newNote')
    cy.dataRef('note-input').type("Note content")
    cy.dataRef('save-note').click()
    cy.xpath(saveNoteModal.saveButton).click()
    navBar.clickFolders()
    navBar.clickOnFolder("Default")
    navBar.clickOnNoteMenu(0)
    navBar.pinNote()
    navBar.clickHome()
    cy.dataRef("pinned-notes-container")
      .should("contain.text", "New note")
  });
});

describe("User is able to unpin a note", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("note is not pinned on home page under `Pinned` section", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Default")
    navBar.clickOnNoteMenu(0)
    navBar.unpinNote()
    navBar.clickHome()
    cy.dataRef("pinned-notes-container")
      .should("not.contain.text", "New note ")
  });
});

describe("User is able to move note to another directory", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Custom")
    navBar.clickOnNoteMenu(0)
    navBar.selectNoteDirectory("Default")
    cy.xpath(toastModal.message, { timeout: 10000 })
      .should("have.text", "Folder has been changed.")
  });
  it("note is moved to new directory", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Default")
    navBar.assertNoteTitle(1, "Password")
  });
});

describe("User is able to find note by title using search bar", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct note title is displayed", () => {
    navBar.insertIntoSearchBarAndClickFirstResult(originalNoteTitle)
    cy.dataRef("note-title").should("contain.text", originalNoteTitle);
  });
});

describe("User is able to find note by content using search bar", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct note title is displayed", () => {
    navBar.insertIntoSearchBarAndClickFirstResult("directory")
    cy.dataRef("note-title").should("contain.text", originalNoteTitle);
  });
  after(() => cy.deleteAccount(username))
});

describe("User is able to add image to note", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("image is displayed in preview", () => {
    cy.visit('/editNote/newNote')
    cy.dataRef("note-input").type("Trying to upload an image")
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.saveButton).click();
    cy.xpath(toastModal.closeButton).click()
    cy.get("[data-ref='file-input']").attachFile("testImg.jpg")
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.saveButton).click();
    cy.dataRef("note-input").should("contain.value", "testImg.jpg");
  });
  after(() => cy.deleteAccount(username))
});

describe("User is not able to add to note an image, which is larger than 4MB", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    cy.visit('/editNote/newNote')
    cy.dataRef("note-input").type("Trying to upload an image")
    cy.dataRef("save-note").click();
    cy.xpath(saveNoteModal.saveButton).click();
    cy.xpath(toastModal.closeButton).click()
    cy.get("[data-ref='file-input']").attachFile("testImgLarge.jpg")
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "Image Size is to large! Max size is 4 MB."
    );
    cy.dataRef("note-input").should("not.contain.value", "testImgLarge.jpg");
  });
  after(() => cy.deleteAccount(username))
});