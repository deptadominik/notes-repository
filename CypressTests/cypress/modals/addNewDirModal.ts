export class addNewDirModal {
    static insertDirectoryName(name: string): void {
        cy.xpath("//input[@id='directoryTitle']").type(name)
        cy.xpath("//button[text()='Save']").click()
    }

    static getValidationMessage(): Cypress.Chainable<JQuery<HTMLElement>> 
    {
        return cy.xpath("//div[@class='validation-message']");
    }
} 