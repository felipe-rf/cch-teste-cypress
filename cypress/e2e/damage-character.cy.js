describe("Character HP updates correctly after damage", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");
    cy.get('[data-testid="add-character-button"]').click();

    // Modal should appear
    cy.get('[data-testid="character-form"]').should("be.visible");

    // Title should be correct
    cy.get('[data-testid="character-form-title"]').should(
      "contain",
      "Create Character"
    );

    // Fill out form
    cy.get('[data-testid="input-name"]').type("Gimli");
    cy.get('[data-testid="input-currentHp"]').clear().type("22");
    cy.get('[data-testid="input-tempHp"]').clear().type("3");
    cy.get('[data-testid="input-maxHp"]').clear().type("30");
    cy.get('[data-testid="input-ac"]').clear().type("18");
    cy.get('[data-testid="input-initiative"]').clear().type("1");
    cy.get('[data-testid="input-link"]').type("https://dwarf.com");

    // Submit
    cy.get('[data-testid="btn-submit"]').click();

    // Dialog should close
    cy.get('[data-testid="character-form-dialog"]').should("not.exist");

    // New character should appear in UI
    cy.contains("Gimli").should("exist");
  });

  it("uses temp HP first when taking damage", () => {
    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="damage-button"]')
      .click();

    cy.get('[data-testid="input-damage-amount"]').clear().type("3");
    cy.get('[data-testid="btn-submit-damage"]').click();

    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .within(() => {
        cy.get('[data-testid^="temp-hp-"]').should("contain", "2");
        cy.get('[data-testid^="current-hp-"]').should("contain", "20");
      });
  });

  it("spills over from temp HP to current HP", () => {
    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="damage-button"]')
      .click();

    cy.get('[data-testid="input-damage-amount"]').clear().type("10");
    cy.get('[data-testid="btn-submit-damage"]').click();

    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .within(() => {
        cy.get('[data-testid^="temp-hp-"]').should("not.exist");
        cy.get('[data-testid^="current-hp-"]').should("contain", "15");
      });
  });

  it("marks character as dead when HP reaches 0", () => {
    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="damage-button"]')
      .click();

    cy.get('[data-testid="input-damage-amount"]').clear().type("999");
    cy.get('[data-testid="btn-submit-damage"]').click();

    cy.contains("Gimli")
      .closest('[data-testid^="character-card-"]')
      .within(() => {
        cy.get('[data-testid^="current-hp-"]').should("contain", "0");
        cy.get(`[data-testid^="icon-skull-"]`).should("exist");
      });
  });
});
