import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { saveNoteModal } from "../../modals/saveNoteModal";
import { toastModal } from "../../modals/toastModal";

const username: string = "folder@bin.com";
const password: string = "Admin123!";
const originalNoteTitle: string = "Password list";

describe("User is able to restore a directory from bin to another directory", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnFolderMenu("Custom")
    navBar.deleteFolder()
    cy.reload()
    navBar.clickTrash()
    navBar.clickOnFolderMenuInBin("Custom")
    cy.xpath(saveNoteModal.noteIconBinSelect).select("Default");
    cy.xpath(saveNoteModal.saveButton).click()
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The directory has been restored."
    );
  });
  it("directory is restored to correct directory", () => {
    navBar.clickFolders()
    navBar.clickOnFolder("Default")
    navBar.assertDirectoryName("Custom", "Custom")
  });
  after(() => {
    cy.deleteAccount(username)
  })
});

describe("User is able to delete a directory permanently from bin", () => {
  before(() => cy.createAccountWithNote(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });
  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnFolderMenu("Custom")
    navBar.deleteFolder()
    cy.reload()
    navBar.clickTrash()
    navBar.clickOnFolderMenuInBin("Custom")
    cy.xpath("//div[text()='Delete Folder Permanently']").click();
    cy.xpath(saveNoteModal.closeButton).click()
    cy.xpath(toastModal.message, { timeout: 10000 }).should(
      "have.text",
      "The directory has been removed."
    );
  });
  it("directory is no more visible in trash", () => {
    navBar.clickTrash()
    cy.dataRef("dir-Custom").should("not.exist")
  });
  after(() => {
    cy.deleteAccount(username)
  })
});