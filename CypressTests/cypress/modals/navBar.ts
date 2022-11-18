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
}
