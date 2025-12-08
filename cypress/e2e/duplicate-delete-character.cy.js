describe("Character Form - Edit Mode", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");

    // Create test character via UI
    cy.get('[data-testid="add-character-button"]').click();

    cy.get('[data-testid="character-form-dialog"]').should("be.visible");

    cy.get('[data-testid="input-name"]').type("Gimli");
    cy.get('[data-testid="input-currentHp"]').clear().type("22");
    cy.get('[data-testid="input-tempHp"]').clear().type("3");
    cy.get('[data-testid="input-maxHp"]').clear().type("30");
    cy.get('[data-testid="input-ac"]').clear().type("18");
    cy.get('[data-testid="input-initiative"]').clear().type("1");

    cy.get('[data-testid="btn-submit"]').click();

    cy.contains("Gimli").should("exist");
  });

  it("duplicates a character", () => {
    // Open edit
    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="edit-button"]')
      .click();

    cy.get('[data-testid="character-form-dialog"]').should("be.visible");

    // Duplicate
    cy.get('[data-testid="btn-duplicate"]').click();

    // Assert duplication
    cy.get('[data-testid^="character-card-"]').then(($cards) => {
      const matches = $cards.filter((_, el) => el.innerText.includes("Gimli"));
      expect(matches.length).to.be.greaterThan(1);
    });
  });

  it("deletes a character", () => {
    // Open edit
    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="edit-button"]')
      .click();

    cy.get('[data-testid="character-form-dialog"]').should("be.visible");

    // Delete
    cy.get('[data-testid="btn-delete"]').click();

    // Assert deletion
    cy.contains("Gimli").should("not.exist");
  });
});
