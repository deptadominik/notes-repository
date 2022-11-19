import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { saveNoteModal } from "../../modals/saveNoteModal";
import { toastModal } from "../../modals/toastModal";
import { use } from "chai";

const username: string = "operateOn@note.com";
const password: string = "Admin123!";
const originalNoteTitle: string = "Password list";
const newNoteTitle: string = "Custom title";
const newNoteContent: string = "New note content";

describe("User is able to move note to another directory", () => {
  before(() => cy.createAccountWithNote(username, password));

  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
  });

  it("correct notification is displayed", () => {
    navBar.clickFolders()
    navBar.clickOnDirectory("Custom")
    navBar.clickOnNoteMenu(0)
    navBar.selectNoteDirectory("Default")
    cy.xpath(toastModal.message, { timeout: 10000 })
      .should("have.text", "Folder has been changed.")
  });
  it("note is moved to new directory", () => {
    navBar.clickFolders()
    navBar.clickOnDirectory("Default")
    navBar.assertNoteTitle(0, "Password")
  });

  after(() => cy.deleteAccount(username))
});