import "../../support/commands";
import { loginPage } from "../../pages/loginPage";

const username: string = "home@validation.com";
const password: string = "Admin123!";

describe("User is able to filter by last created/edited notes", () => {
  before(() => cy.createAccountWithManyNotes(username, password));
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
    cy.viewport(1920, 1080);
  });
  it("filter works for 5 notes", () => {
    cy.dataRef("last-edited").select("5");
    cy.dataRef("last-edited-note").should("have.length", 5);
  });
  it("filter works for 10 notes", () => {
    cy.dataRef("last-edited").select("10");
    cy.dataRef("last-edited-note").should("have.length", 10);
  });
  it("filter works for 15 notes", () => {
    cy.dataRef("last-edited").select("15");
    cy.dataRef("last-edited-note").should("have.length", 15);
  });
  it("filter works for 20 notes", () => {
    cy.dataRef("last-edited").select("20");
    cy.dataRef("last-edited-note").should("have.length", 20);
  });
  it("filter works for 25 notes", () => {
    cy.dataRef("last-edited").select("25");
    cy.dataRef("last-edited-note").should("have.length", 25);
  });
  it("filter works for 30 notes", () => {
    cy.dataRef("last-edited").select("30");
    cy.dataRef("last-edited-note").should("have.length", 30);
  });
  it("filter works for 35 notes", () => {
    cy.dataRef("last-edited").select("35");
    cy.dataRef("last-edited-note").should("have.length", 35);
  });
  it("filter works for 40 notes", () => {
    cy.dataRef("last-edited").select("40");
    cy.dataRef("last-edited-note").should("have.length", 40);
  });
  it("filter works for 45 notes", () => {
    cy.dataRef("last-edited").select("45");
    cy.dataRef("last-edited-note").should("have.length", 45);
  });
});

describe("User is able to see upcoming events", () => {
  beforeEach(() => {
    cy.visit("/Identity/Account/Login");
    loginPage.login(username, password);
    cy.viewport(1920, 1080);
  });
  it("upcoming event is visible", () => {
    cy.dataRef("last-edited-event").should(
      "contain.text",
      "Mommy's 50th birthday"
    );
  });
  after(() => {
    cy.deleteAccount(username);
  });
});
