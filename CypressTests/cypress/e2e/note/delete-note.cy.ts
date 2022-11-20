import "../../support/commands";
import { loginPage } from "../../pages/loginPage";
import { navBar } from "../../modals/navBar";
import { toastModal } from "../../modals/toastModal";

const username: string = "delete@note.com";
const password: string = "Admin123!";

describe("User is able to delete note", () => {
    before(() => cy.createAccountWithNote(username, password));
    beforeEach(() => {
        cy.visit("/Identity/Account/Login");
        loginPage.login(username, password);
    });
    it("correct notification is displayed", () => {
        navBar.clickFolders()
        navBar.clickOnDirectory("Custom")
        navBar.clickOnNoteMenu(0)
        navBar.clickDeleteNote()
        cy.xpath(toastModal.message, { timeout: 10000 }).should(
            "have.text",
            "Note has been deleted!"
        );
    });
    after(() => cy.deleteAccount(username))
});