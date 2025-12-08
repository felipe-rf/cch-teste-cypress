describe("Render and modal tests", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");
  });

  it("renders default elements on screen", () => {
    cy.get('[data-testid="title"]').should("contain", "Initiative Tracker");
    cy.get('[data-testid="made-by"]').should("exist");
    cy.get('[data-testid="made-by-link"]').should("exist");
    cy.get('[data-testid="add-character-button"]').should("exist");
    cy.get('[data-testid="character-form"]').should("not.exist");
    cy.get('[data-testid="damage-form-dialog"]').should("not.exist");
    cy.get('[data-testid="heal-form-dialog"]').should("not.exist");
  });

  it("can open and close the character form modal", () => {
    cy.get('[data-testid="add-character-button"]').click();
    cy.get('[data-testid="character-form"]').should("exist");

    cy.get('[data-testid="btn-cancel"]').click();
    cy.get('[data-testid="character-form"]').should("not.exist");
  });

  it("can open and close the damage form modal", () => {
    // First, create a character to have a damage button
    cy.get('[data-testid="add-character-button"]').click();
    cy.get('[data-testid="input-name"]').type("Tank");
    cy.get('[data-testid="input-currentHp"]').clear().type("10");
    cy.get('[data-testid="input-tempHp"]').clear().type("0");
    cy.get('[data-testid="input-maxHp"]').clear().type("10");
    cy.get('[data-testid="input-ac"]').clear().type("10");
    cy.get('[data-testid="input-initiative"]').clear().type("5");
    cy.get('[data-testid="btn-submit"]').click();

    cy.contains("Tank")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="damage-button"]')
      .click();

    cy.get('[data-testid="damage-form-dialog"]').should("exist");

    cy.get('[data-testid="btn-cancel-damage"]').click();
    cy.get('[data-testid="damage-form-dialog"]').should("not.exist");
  });

  it("can open and close the heal form modal", () => {
    // First, create a character to have a heal button
    cy.get('[data-testid="add-character-button"]').click();
    cy.get('[data-testid="input-name"]').type("Cleric");
    cy.get('[data-testid="input-currentHp"]').clear().type("10");
    cy.get('[data-testid="input-tempHp"]').clear().type("0");
    cy.get('[data-testid="input-maxHp"]').clear().type("10");
    cy.get('[data-testid="input-ac"]').clear().type("10");
    cy.get('[data-testid="input-initiative"]').clear().type("5");
    cy.get('[data-testid="btn-submit"]').click();

    cy.contains("Cleric")
      .closest('[data-testid^="character-card-"]')
      .find('[data-testid="heal-button"]')
      .click();

    cy.get('[data-testid="heal-form-dialog"]').should("exist");

    cy.get('[data-testid="btn-cancel-heal"]').click();
    cy.get('[data-testid="heal-form-dialog"]').should("not.exist");
  });
});
