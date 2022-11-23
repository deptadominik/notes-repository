export class navBar {
  static expandDirectories() {
    cy.dataRef("main-dir-btn").click();
  }
  static insertIntoSearchBarAndClickFirstResult(searchAttribute: string) {
    cy.dataRef("search-bar").type(searchAttribute);
    cy.xpath(
      '//div[contains(@class,"blazored-typeahead__active-item")]'
    ).first().click();
  }
  static clickFolders() {
    cy.dataRef("main-dir-btn").click();
  }
  static clickHome() {
    cy.dataRef("home-btn").click();
  }
  static clickTemplates() {
    cy.dataRef("templates-btn").click();
  }
  static clickTrash() {
    cy.dataRef("bin-btn").click();
  }
  static clickOnFolder(directoryName: string): void {
    cy.dataRef(`dir-${directoryName}`).click();
  }
  static clickOnNoteMenu(noteTitle: string): void {
    cy.dataRef(`'note-menu-${noteTitle}'`).click();
  }
  static clickOnFolderMenu(directoryName: string): void {
    cy.dataRef(`'open-menu-for-${directoryName}'`).click();
  }
  static clickOnFolderMenuInBin(directoryName: string): void {
    cy.dataRef(`'dir-menu-${directoryName}'`).click();
  }
  static clickOnNoteMenuByTitle(noteTitle: string): void {
    cy.dataRef(`'note-menu-${noteTitle}'`).click();
  }
  static clickDeleteNote(): void {
    cy.xpath("//div[text()='Delete note']").click();
  }
  static assertNoteTitle(noteTitle: string, assertion: string): void {
    cy.get(`[data-ref="note-${noteTitle}"`).should(($title) => {
      expect($title.text()).to.contain(assertion)
    });
  }
  static assertDirectoryName(directoryName: string, assertion: string): void {
    cy.get(`[data-ref="dir-${directoryName}"`).should(($title) => {
      expect($title.text()).to.contain(assertion)
    });
  }
  static selectNoteDirectory(directoryName: string): void {
    cy.dataRef("dir-select").select(directoryName);
    cy.wait(1000)
    cy.xpath("//button[text()='Save']").click();
  }
  static pinNote(): void {
    cy.xpath("//div[text()='Pin note']").click();
    cy.xpath("//div[@class='blazored-modal-content']//button[text()='Save']").click();
  }
  static unpinNote(): void {
    cy.xpath("//div[text()='Unpin note']").click();
    cy.xpath("//div[@class='blazored-modal-content']//button[text()='Save']").click();
  }
  static deleteNote(): void {
    cy.xpath("//div[text()='Delete note']").click();
  }
  static deleteFolder(): void {
    cy.dataRef("delete-dir").click();
  }
  static addNewDirectory(): void {
    cy.dataRef("add-new-dir").click();
  }
  static addNewSubdirectory(directoryName: string): void {
    cy.dataRef(`add-subdir-for-${directoryName}`).click();
  }
  static openDirectoryMenu(directoryName: string): void {
    cy.dataRef(`open-menu-for-${directoryName}`).click();
  }
}
