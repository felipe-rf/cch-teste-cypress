describe("Character Healing", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");

    // Create a character first
    cy.get('[data-testid="add-character-button"]').click();
    cy.get('[data-testid="input-name"]').type("Cleric");
    cy.get('[data-testid="input-currentHp"]').clear().type("5");
    cy.get('[data-testid="input-tempHp"]').clear().type("2");
    cy.get('[data-testid="input-maxHp"]').clear().type("10");
    cy.get('[data-testid="input-ac"]').clear().type("12");
    cy.get('[data-testid="input-initiative"]').clear().type("3");
    cy.get('[data-testid="btn-submit"]').click();

    cy.contains("Cleric").should("exist");
  });

  it("heals a character normally", () => {
    cy.contains("Cleric")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="heal-button"]')
      .click();

    cy.get('[data-testid="heal-form-dialog"]').should("exist");

    // Enter heal amounts
    cy.get('[data-testid="input-heal-amount"]').clear().type("3");
    cy.get('[data-testid="input-temp-heal-amount"]').clear().type("1");

    cy.get('[data-testid="btn-submit-heal"]').click();

    // Check that HP updated correctly
    cy.get('[data-testid^="current-hp-"]').should("contain.text", "8");
    cy.get('[data-testid^="temp-hp-"]').should("contain.text", "1");
  });

  it("revives a dead character when healed", () => {
    // First, kill the character
    cy.contains("Cleric")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="damage-button"]')
      .click();

    cy.get('[data-testid="damage-form-dialog"]').should("exist");
    cy.get('[data-testid="damage-form"]').within(() => {
      cy.get('input[type="number"]').clear().type("10");
    });
    cy.get('[data-testid="btn-submit-damage"]').click();

    // Verify skull icon appears
    cy.get('[data-testid^="icon-skull-"]').should("exist");

    // Heal character
    cy.contains("Cleric")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="heal-button"]')
      .click();

    cy.get('[data-testid="input-heal-amount"]').clear().type("5");
    cy.get('[data-testid="input-temp-heal-amount"]').clear().type("0");
    cy.get('[data-testid="btn-submit-heal"]').click();

    // Verify character is no longer dead
    cy.get('[data-testid^="icon-skull-"]').should("not.exist");
  });
});
