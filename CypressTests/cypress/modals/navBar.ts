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
  static clickOnDirectory(directoryName: string): void {
    cy.dataRef(`dir-${directoryName}`).click();
  }
  static clickOnNoteMenu(noteIndex: number): void {
    cy.dataRef(`note-menu-${noteIndex}`).click();
  }
  static clickDeleteNote(): void {
    cy.xpath("//div[text()='Delete note']").click();
  }
  static assertNoteTitle(noteIndex: number, noteTitle: string): void {
    cy.get(`[data-ref="note-${noteIndex}"`).should(($title) => {
      expect($title.text()).to.contain(noteTitle)
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
}
