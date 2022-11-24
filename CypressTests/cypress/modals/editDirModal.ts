export class editDirModal {
    static insertNewFolderName(newName: string): void {
        cy.xpath("//input[@id='directoryTitle']").clear().type(newName)
        cy.xpath("//button[text()='Save']").click()
    }
    static deleteFolder(): void {
        cy.dataRef("delete-dir").click()
    }
    static closeModal(): void {
        cy.xpath("//button[@class='blazored-modal-close']").click()
    }
    static selectNewFolder(newFolder: string): void {
        cy.xpath("//select[@id='folderTitle']").select(newFolder)
        cy.xpath("//button[text()='Save']").click()
    }
}