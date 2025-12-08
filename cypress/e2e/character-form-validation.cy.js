describe("Character Form – Validation", () => {
  beforeEach(() => {
    cy.visit("http://felipe-rf.github.io/initiative-tracker/");
    cy.get('[data-testid="add-character-button"]').click();
    cy.get('[data-testid="character-form"]').should("be.visible");
  });

  it("should block submit when required fields are empty", () => {
    // Try submitting without filling anything
    cy.get('[data-testid="btn-submit"]').click();

    // Native browser validation should prevent submission
    cy.get('[data-testid="character-form"]').then(($form) => {
      expect($form[0].checkValidity()).to.eq(false);
    });

    // Dialog should still be open
    cy.get('[data-testid="character-form"]').should("be.visible");
  });

  it("should block negative numbers", () => {
    cy.get('[data-testid="input-name"]').type("Bad Values");

    cy.get('[data-testid="input-currentHp"]').clear().type("-1");
    cy.get('[data-testid="input-maxHp"]').clear().type("-5");
    cy.get('[data-testid="input-ac"]').clear().type("-2");
    cy.get('[data-testid="input-initiative"]').clear().type("-3");

    cy.get('[data-testid="btn-submit"]').click();

    cy.get('[data-testid="character-form"]').then(($form) => {
      expect($form[0].checkValidity()).to.eq(false);
    });

    cy.get('[data-testid="character-form-dialog"]').should("be.visible");
  });

  it("should show validation error for invalid URL", () => {
    cy.get('[data-testid="input-name"]').type("Bad URL");

    cy.get('[data-testid="input-currentHp"]').clear().type("10");
    cy.get('[data-testid="input-maxHp"]').clear().type("20");
    cy.get('[data-testid="input-ac"]').clear().type("15");
    cy.get('[data-testid="input-initiative"]').clear().type("2");

    cy.get('[data-testid="input-link"]').type("not-a-url");

    cy.get('[data-testid="btn-submit"]').click();

    cy.get('[data-testid="character-form"]').then(($form) => {
      expect($form[0].checkValidity()).to.eq(false);
    });
  });
});
